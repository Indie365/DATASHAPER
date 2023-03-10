/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Step, Workflow } from '@datashaper/workflow'

export interface StepOutputProps {
	step: Step
	output: string
	index: number
	workflow: Workflow
	onStepChange: (step: Step, index: number) => void
	onStepOutputChange: (step: Step, output: string | undefined) => void
}
