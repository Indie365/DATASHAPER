/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type {
	FieldError,
	SortDirection,
	ValidationResult,
} from '@datashaper/schema'
import { DataType } from '@datashaper/schema'
import type { TableMetadata } from '@datashaper/tables'
import type { IColumn } from '@fluentui/react'
import type ColumnTable from 'arquero/dist/types/table/column-table'
import { useMemo } from 'react'

import { EMPTY_ARRAY, emptyArray } from '../../../empty.js'
import type {
	ArqueroDetailsListFeatures,
	ColumnSelectFunction,
	DropdownOptionSelect,
} from '../index.js'
import {
	createRenderColumnHeader,
	createRenderCommandBarColumnHeader,
	createRenderDefaultColumnHeader,
	createRenderFeaturesCell,
	createRenderHistogramColumnHeader,
	createRenderSmartCell,
	createRenderStatsColumnHeader,
} from '../renderers/index.js'
import {
	useColumnNamesList,
	useColumnStyles,
	useIncrementingColumnColorScale,
} from './index.js'
import { useCountMinWidth } from './useCountMinWidth.js'

export interface ColumnOptions {
	features?: ArqueroDetailsListFeatures
	sortColumn?: string
	sortDirection?: SortDirection
	selectedColumn?: string
	onCellDropdownSelect?: DropdownOptionSelect
	sortable?: boolean
	showColumnBorders?: boolean
	compact?: boolean
	resizable?: boolean
}

/**
 * Overlays a number of special features onto the IColumn objects for a table.
 * This includes overridden renderers to support our sorting, selection, and data visualization.
 * @param table -
 * @param columns -
 * @param options -
 * @returns
 */
export function useColumns(
	table: ColumnTable,
	validationResult?: ValidationResult,
	metadata?: TableMetadata,
	columns?: IColumn[],
	onColumnSelect?: ColumnSelectFunction,
	onSort?: ColumnSelectFunction,
	options: ColumnOptions = {},
	virtualColumns?: IColumn[],
): IColumn[] {
	const {
		features = {},
		sortColumn,
		sortDirection,
		selectedColumn,
		onCellDropdownSelect,
		sortable = false,
		showColumnBorders = false,
		compact = false,
		resizable = true,
	} = options

	const colorScale = useIncrementingColumnColorScale(metadata)
	const styles = useColumnStyles(!!onColumnSelect, showColumnBorders)
	const names = useColumnNamesList(table, columns)
	//get column width based on min value or on commandBar item passed
	const columnMinWidth = useCountMinWidth(features.commandBar)

	return useMemo(() => {
		const columnMap = reduce([
			...(columns || EMPTY_ARRAY),
			...(virtualColumns || EMPTY_ARRAY),
		])
		const virtualNames = virtualColumns?.map(c => c.key) || emptyArray()
		return [...names, ...virtualNames].map(name => {
			const column = columnMap[name] || {
				key: name,
				name,
				minWidth: columnMinWidth,
				fieldName: name,
			}

			const errors =
				validationResult !== undefined
					? getColumnValidation(validationResult, name)
					: { errors: [] }

			// HACK: if we let an iconName through, the rendering messes with our layout.
			// In order to control this we'll pass the original props to the generators,
			// but omit from what gets sent to the top-level table.
			// As far as I can tell there's no other way to force the table to let us control this icon rendering
			// without completely recreating the details header render
			const { iconName, ...defaults } = column

			const meta = metadata?.columns[name] || { name }
			const color = meta?.type === DataType.Number ? colorScale() : undefined
			const onRender =
				features.smartCells && meta
					? createRenderSmartCell(
							meta,
							color,
							onColumnSelect,
							onCellDropdownSelect,
							errors,
					  )
					: createRenderFeaturesCell(
							features,
							meta,
							color,
							onColumnSelect,
							onCellDropdownSelect,
							errors,
					  )

			const headerRenderers = [
				createRenderDefaultColumnHeader(
					column,
					sortable,
					errors,
					onColumnSelect,
					onSort,
				),
			]

			if (features.commandBar) {
				headerRenderers.push(
					createRenderCommandBarColumnHeader(features.commandBar),
				)
			}
			if ((features.smartHeaders || features.statsColumnHeaders) && meta) {
				headerRenderers.push(
					createRenderStatsColumnHeader(
						meta,
						onColumnSelect,
						features.statsColumnTypes,
					),
				)
			}
			if ((features.smartHeaders || features.histogramColumnHeaders) && meta) {
				headerRenderers.push(
					createRenderHistogramColumnHeader(meta, color, onColumnSelect),
				)
			}

			return {
				onRender,
				onRenderHeader: createRenderColumnHeader(headerRenderers),
				isSorted:
					!!sortDirection && column.fieldName === sortColumn ? true : false,
				isSortedDescending: sortDirection === 'desc',
				styles,
				...defaults,
				data: {
					selected: column.key === selectedColumn,
					compact,
					...column.data,
				},
				isResizable: resizable,
			}
		})
	}, [
		columns,
		names,
		features,
		sortColumn,
		sortDirection,
		selectedColumn,
		styles,
		compact,
		resizable,
		metadata,
		colorScale,
		onSort,
		onColumnSelect,
		onCellDropdownSelect,
		columnMinWidth,
		virtualColumns,
		sortable,
		validationResult,
	])
}

function reduce(columns: IColumn[]): Record<string, IColumn> {
	return columns.reduce((acc, cur) => {
		acc[cur.key] = cur
		return acc
	}, {} as Record<string, IColumn>)
}

function getColumnValidation(
	validationResult: ValidationResult,
	name: string,
): ValidationResult {
	const filteredErrors: FieldError[] = validationResult.errors.filter(
		e => e.name === name,
	)

	const validationResultFiltered: ValidationResult = {
		errors: filteredErrors,
	}

	return validationResultFiltered
}
