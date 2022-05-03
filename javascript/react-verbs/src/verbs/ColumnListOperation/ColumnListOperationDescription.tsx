/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { InputColumnListArgs } from '@data-wrangling-components/core'
import { memo, useMemo } from 'react'

import { createRowEntries } from '../../common/createRowEntries.js'
import { VerbDescription } from '../../common/VerbDescription.js'
import type { StepDescriptionProps } from '@data-wrangling-components/react-types'

export const ColumnListOperationDescription: React.FC<
	StepDescriptionProps<InputColumnListArgs>
> = memo(function ColumnListOperationDescription(props) {
	const rows = useMemo(() => {
		const {
			step: { args },
		} = props
		const sub = createRowEntries(
			args.columns || [],
			c => ({
				value: c,
			}),
			1,
			props,
		)
		return [
			{
				before: `with column${args.columns?.length !== 1 ? 's' : ''}`,
				value: args.columns?.length === 0 ? undefined : '',
				sub,
			},
		]
	}, [props])
	return <VerbDescription {...props} rows={rows} />
})
