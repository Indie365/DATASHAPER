/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { MessageBar, MessageBarType, useTheme } from '@fluentui/react'
import { memo, useState } from 'react'

import { useHandleFileUpload } from '../hooks/uploads.js'
import { CommandBar } from './CommandBar.js'
import { Dropzone } from './Dropzone.js'
import {
	useOnUpdateWorkflowJson,
	useProjectMgmtCommands,
} from './ProjectMgmtCommandBar.hooks.js'
import {
	background,
	color,
	dropzone,
	Wrapper,
} from './ProjectMgmtCommandBar.styles.js'
import type { ProjectMgmtCommandBarProps } from './ProjectMgmtCommandBar.types.js'

const acceptedFileTypes = ['.csv', '.json', '.zip']

export const ProjectMgmtCommandBar: React.FC<ProjectMgmtCommandBarProps> = memo(
	function ProjectMgmtCommandBar({
		workflow,
		tables,
		outputTables,
		onUpdateWorkflow,
		onUpdateTables,
		...props
	}) {
		const theme = useTheme()
		const [error, setError] = useState('')
		const onUpdateWorkflowJson = useOnUpdateWorkflowJson(onUpdateWorkflow)
		const commands = useProjectMgmtCommands(
			workflow,
			tables,
			outputTables,
			onUpdateWorkflowJson,
			onUpdateTables,
			setError,
		)
		const onDrop = useHandleFileUpload(onUpdateWorkflowJson, onUpdateTables)

		return (
			<>
				{error ? (
					<MessageBar
						messageBarType={MessageBarType.error}
						isMultiline={false}
						onDismiss={() => setError('')}
						dismissButtonAriaLabel="Close"
					>
						{error}
					</MessageBar>
				) : null}
				<Dropzone
					acceptedFileTypes={acceptedFileTypes}
					onDrop={onDrop}
					styles={dropzone}
				>
					<Wrapper>
						<CommandBar
							items={commands}
							background={background(theme)}
							color={color(theme)}
							{...props}
						/>
					</Wrapper>
				</Dropzone>
			</>
		)
	},
)
