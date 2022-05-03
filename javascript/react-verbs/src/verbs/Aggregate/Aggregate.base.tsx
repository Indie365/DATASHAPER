/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { AggregateArgs } from '@data-wrangling-components/core'
import { FieldAggregateOperation } from '@data-wrangling-components/core'
import { useMemo } from 'react'

import type { FormInput } from '../../common/VerbForm.js'
import { VerbForm } from '../../common/VerbForm.js'
import { dropdown, enumDropdown } from '../../common/VerbFormFactories.js'
import type { StepComponentBaseProps } from '@data-wrangling-components/react-types'

/**
 * Just the group/column/op inputs for an aggregation.
 * Input table is expected to be edited elsewhere and configured as the step input.
 */
export const AggregateBase: React.FC<
	StepComponentBaseProps<AggregateArgs> & {
		columns: string[]
	}
> = function AggregateBase({ step, onChange, columns }) {
	const verbInputs = useMemo<FormInput<AggregateArgs>[]>(
		() => [
			dropdown(
				'Column to group by',
				columns,
				step.args.groupby,
				(s, key) => (s.args.groupby = key as string),
				{ required: true },
			),
			enumDropdown(
				'Function',
				FieldAggregateOperation,
				step.args.operation,
				(s, key) => (s.args.operation = key as FieldAggregateOperation),
				{ required: true },
			),
		],
		[step, columns],
	)

	return <VerbForm step={step} inputs={verbInputs} onChange={onChange} />
}
