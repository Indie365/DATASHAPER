/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { IColumn } from '@fluentui/react'
import { Checkbox } from '@fluentui/react'
import {
	type FormEvent,
	memo,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'

import { StatsColumnType } from '../../ArqueroDetailsList/ArqueroDetailsList.types.js'
import { HistogramColumnHeader } from '../../ArqueroDetailsList/renderers/HistogramColumnHeader.js'
import { StatsColumnHeader } from '../../ArqueroDetailsList/renderers/StatsColumnHeader.js'
import { DataDisplay, FieldName, Flex } from './CodebookStatsField.styles.js'
import type { CodebookStatsFieldProps } from './CodebookStatsField.types.js'

const DEFAULT_STATS = [
	StatsColumnType.Count,
	StatsColumnType.Min,
	StatsColumnType.Max,
	StatsColumnType.Example,
]

export const CodebookStatsField: React.FC<CodebookStatsFieldProps> = memo(
	function CodebookStatsField(props) {
		const { field, onChangeField, styles, checkbox, histogramColumn } = props
		const [column, setColumn] = useState(histogramColumn)
		const wrapperRef = useRef<HTMLDivElement | null>(null)

		useEffect(() => {
			if (!histogramColumn) {
				setColumn({
					currentWidth:
						(wrapperRef?.current?.clientWidth || 0) -
						(Number(styles?.root?.padding || 0) * 2 ?? 0),
				} as IColumn)
			}
		}, [wrapperRef, histogramColumn, styles])

		const onChangeValue = useCallback(
			(
				_?: FormEvent<HTMLElement | HTMLInputElement> | undefined,
				checked?: boolean | undefined,
			) => {
				onChangeField?.({ ...field, exclude: !checked })
				checkbox?.onChange?.(_, checked)
			},
			[onChangeField, checkbox, field],
		)

		return (
			<div ref={wrapperRef} style={styles?.root}>
				<Flex>
					<Checkbox
						styles={styles?.checkbox}
						checked={!field.exclude}
						{...checkbox}
						onChange={onChangeValue}
					/>
					<FieldName disabled={field.exclude}>{field.name}</FieldName>
				</Flex>
				<DataDisplay>
					<StatsColumnHeader
						stats={DEFAULT_STATS}
						field={field}
						disabled={field.exclude}
					/>
					<HistogramColumnHeader
						column={column}
						field={field}
						disabled={field.exclude}
					/>
				</DataDisplay>
			</div>
		)
	},
)
