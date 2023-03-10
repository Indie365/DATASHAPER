/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { JoinArgs } from '@datashaper/schema'
import type { Step } from '@datashaper/workflow'
import { useMemo } from 'react'

export function useLeftColumn(step: Step<JoinArgs>): string | undefined {
	return useMemo(() => getLeftColumn(step), [step])
}

export function getLeftColumn(step: Step<JoinArgs>): string | undefined {
	return step.args.on && step.args.on.length > 0 ? step.args.on[0] : undefined
}
