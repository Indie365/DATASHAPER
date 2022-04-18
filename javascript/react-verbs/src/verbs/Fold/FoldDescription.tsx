/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { FoldStep } from '@data-wrangling-components/core'
import { memo, useMemo } from 'react'

import { createRowEntries } from '../../common/createRowEntries.js'
import { VerbDescription } from '../../common/VerbDescription.js'
import type { StepDescriptionProps } from '../../types.js'

export const FoldDescription: React.FC<StepDescriptionProps> = memo(
	function FoldDescription(props) {
		const rows = useMemo(() => {
			const internal = props.step as FoldStep
			const { args } = internal
			const sub = createRowEntries(
				args.columns || [],
				c => ({
					value: c,
				}),
				3,
				props,
			)
			return [
				{
					before: `column${(args.columns || []).length !== 1 ? 's' : ''}`,
					value: args.columns.length === 0 ? undefined : '',
					sub,
				},
				{
					before: 'into key column',
					value: args.to !== undefined ? args.to[0] : '',
				},
				{
					before: 'into value column',
					value: args.to !== undefined ? args.to[1] : '',
				},
			]
		}, [props])
		return <VerbDescription {...props} rows={rows} />
	},
)