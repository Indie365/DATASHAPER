/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { Step } from '@data-wrangling-components/core'
import {
	withInputColumnDropdown,
	withInputTableDropdown,
	withOutputColumnTextfield,
	withOutputTableTextfield,
} from '@data-wrangling-components/react-hocs'
import type { StepComponentProps } from '@data-wrangling-components/react-verbs'
import flow from 'lodash-es/flow.js'
import { useMemo } from 'react'

import { selectStepComponent } from '../../index.js'

export function useHandleTableStepArgs(
	step: Step | undefined,
	disabled?: boolean,
): React.FC<StepComponentProps> | undefined {
	const Component = useMemo(
		() => (step ? selectStepComponent(step) : null),
		[step],
	)

	const WithAllArgs = useMemo(() => {
		if (Component) {
			return flow(
				withOutputTableTextfield(undefined, disabled),
				withOutputColumnTextfield(),
				withInputColumnDropdown(),
				withInputTableDropdown(),
			)(Component)
		}
	}, [Component, disabled])

	return WithAllArgs
}