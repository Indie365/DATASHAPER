/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	DetailsList,
	DetailsListLayoutMode,
	IColumn,
	SelectionMode,
	IDetailsListStyles,
	ConstrainMode,
} from '@fluentui/react'
import React, { memo, useMemo } from 'react'
import styled from 'styled-components'
import {
	useColumns,
	useDetailsHeaderRenderer,
	useDetailsListStyles,
	useSlicedTable,
	useSortedTable,
	useSortHandling,
	useStripedRowsRenderer,
	useSubsetTable,
} from './hooks'
import { ArqueroDetailsListProps } from '.'

/**
 * Renders an arquero table using a fluent DetailsList.
 */
export const ArqueroDetailsList: React.FC<ArqueroDetailsListProps> = memo(
	function ArqueroDetailsList(props) {
		const {
			table,
			features = {},
			metadata,
			offset = 0,
			limit = Infinity,
			includeAllColumns = true,
			visibleColumns,
			isSortable = false,
			isStriped = false,
			isColumnClickable = false,
			showColumnBorders = false,
			selectedColumn,
			onColumnClick,
			onCellDropdownSelect,
			// extract props we want to set data-centric defaults for
			selectionMode = SelectionMode.none,
			layoutMode = DetailsListLayoutMode.fixedColumns,
			columns,
			onColumnHeaderClick,
			styles,
			isHeadersFixed = false,
			// passthrough the remainder as props
			...rest
		} = props

		const { sortColumn, sortDirection, handleColumnHeaderClick } =
			useSortHandling(isSortable, onColumnHeaderClick)

		// first subset the table using the visible columns
		// this will prevent any further operations on columns we aren't going to show
		const subset = useSubsetTable(table, visibleColumns)
		// sort the table internally
		// note that this is different than the orderby of a pipeline step
		// this is a temporary sort only for the table display
		const sorted = useSortedTable(subset, sortColumn, sortDirection)
		// slice any potential page
		const sliced = useSlicedTable(sorted, offset, limit)
		// last, copy these items to actual JS objects for the DetailsList
		const items = useMemo(() => sliced.objects(), [sliced])

		const displayColumns = useColumns(
			table,
			columns,
			metadata,
			visibleColumns,
			{
				features,
				sortColumn,
				sortDirection,
				selectedColumn,
				onColumnClick,
				onCellDropdownSelect,
				includeAllColumns,
				isColumnClickable,
				isSortable,
				showColumnBorders,
			},
		)

		const headerStyle = useDetailsListStyles(
			isHeadersFixed,
			features,
			styles as IDetailsListStyles,
		)

		const renderRow = useStripedRowsRenderer(isStriped, showColumnBorders)
		const renderDetailsHeader = useDetailsHeaderRenderer()

		return (
			<DetailsWrapper>
				<DetailsList
					items={items}
					selectionMode={selectionMode}
					layoutMode={layoutMode}
					columns={displayColumns as IColumn[]}
					onColumnHeaderClick={handleColumnHeaderClick}
					constrainMode={ConstrainMode.unconstrained}
					onRenderRow={renderRow}
					onRenderDetailsHeader={renderDetailsHeader}
					{...rest}
					styles={headerStyle}
				/>
			</DetailsWrapper>
		)
	},
)

const DetailsWrapper = styled.div`
	height: inherit;
	position: relative;
	max-height: inherit;

	span.ms-DetailsHeader-cellTitle {
		background-color: ${({ theme }) => theme.application().background().hex()};
	}
`
