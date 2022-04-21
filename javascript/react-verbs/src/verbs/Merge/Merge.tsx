/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { MergeArgs } from '@data-wrangling-components/core'
import { MergeStrategy } from '@data-wrangling-components/core'
import {
	dropdownStyles,
	EnumDropdown,
} from '@data-wrangling-components/react-controls'
import { NodeInput } from '@essex/dataflow'
import type { IDropdownOption } from '@fluentui/react'
import { Dropdown, TextField } from '@fluentui/react'
import { memo, useCallback, useMemo } from 'react'
import styled from 'styled-components'

import { useHandleDropdownChange } from '../../common/hooks.js'
import {
	LeftAlignedRow,
	useHandleTextFieldChange,
	useLoadTable,
} from '../../common/index.js'
import type { StepComponentProps } from '../../types.js'

/**
 * Just the to/value inputs for an impute.
 * Input table is expected to be edited elsewhere and configured as the step input.
 */
export const Merge: React.FC<StepComponentProps<MergeArgs>> = memo(
	function Merge({ step, store, table, onChange, input }) {
		const tbl = useLoadTable(
			input || step.input[NodeInput.Source]?.node,
			table,
			store,
		)

		const handleColumnChange = useCallback(
			(_event?: React.FormEvent<HTMLDivElement>, option?: IDropdownOption) => {
				const { columns = [] } = step.args
				let update = [...columns]
				if (option) {
					if (option.selected) {
						update.push(option.key as string)
					} else {
						update = update.filter(c => c !== option.key)
					}
				}
				onChange?.({
					...step,
					args: {
						...step.args,
						columns: update,
					},
				})
			},
			[step, onChange],
		)

		const handleOpChange = useHandleDropdownChange(
			step,
			'args.strategy',
			onChange,
		)

		const handleDelimiterChange = useHandleTextFieldChange(
			step,
			'args.delimiter',
			onChange,
		)

		const options = useMemo(() => {
			const columns = tbl?.columnNames() || []
			const hash = (step.args.columns || []).reduce((acc, cur) => {
				acc[cur] = true
				return acc
			}, {} as Record<string, boolean>)
			return columns.map(column => {
				const selected = step.args?.columns && !!hash[column]
				return {
					key: column,
					text: column,
					selected,
				}
			})
		}, [tbl, step])

		const selectedKeys = useMemo(
			() => options.filter(o => o.selected).map(o => o.key),
			[options],
		)

		return (
			<Container>
				<LeftAlignedRow>
					{tbl ? (
						<Dropdown
							label={'Columns'}
							styles={dropdownStyles}
							multiSelect
							options={options}
							selectedKeys={selectedKeys}
							onChange={handleColumnChange}
						/>
					) : null}
				</LeftAlignedRow>
				<LeftAlignedRow>
					<EnumDropdown
						required
						label={'Merge strategy'}
						enumeration={MergeStrategy}
						selectedKey={step.args.strategy}
						onChange={handleOpChange}
					/>
				</LeftAlignedRow>
				{step.args.strategy === MergeStrategy.Concat ? (
					<LeftAlignedRow>
						<TextField
							label={'Delimiter'}
							placeholder={'Text delimiter'}
							value={step.args.delimiter && `${step.args.delimiter}`}
							styles={dropdownStyles}
							onChange={handleDelimiterChange}
						/>
					</LeftAlignedRow>
				) : null}
			</Container>
		)
	},
)

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`
