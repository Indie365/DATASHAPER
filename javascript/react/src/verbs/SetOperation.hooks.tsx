/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { GraphManager, Step } from '@data-wrangling-components/core'
import { TableDropdown } from '../controls/index.js'
import { useSimpleDropdownOptions, useTableNames } from '../hooks/index.js'
import { IconButton } from '@fluentui/react'
import { useMemo } from 'react'
import { icons } from './SetOperation.styles.js'

import { LeftAlignedRow } from '../styles.js'

export function useOthers(
	step: Step,
	onChange?: (step: Step) => void,
	store?: GraphManager,
) {
	const tableNames = useTableNames(store)
	const tableOptions = useSimpleDropdownOptions(tableNames)
	return useMemo(() => {
		return (step.input.others || EMPTY).map((input, index) => {
			const other = input.node

			// on delete, remove the input
			const handleDeleteClick = () => {
				onChange?.({
					...step,
					input: {
						...step.input,
						others: (step.input.others || EMPTY).filter(o => o !== input),
					} as Step['input'],
				})
			}
			if (!store) {
				return null
			}
			return (
				<LeftAlignedRow key={`set-op-${other}-${index}`}>
					<TableDropdown
						label={''}
						options={tableOptions}
						selectedKey={other}
						onChange={(_evt, option) => {
							const update = { ...step }
							if (option) {
								input.node = `${option.key}`
							}
							onChange?.(update)
						}}
					/>
					<IconButton
						title={'Remove this table'}
						iconProps={icons.delete}
						onClick={handleDeleteClick}
					/>
				</LeftAlignedRow>
			)
		})
	}, [step, store, tableOptions, onChange])
}

const EMPTY: any[] = []
