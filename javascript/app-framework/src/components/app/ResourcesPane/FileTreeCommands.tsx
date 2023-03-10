/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { BaseFile } from '@datashaper/utilities'
import { memo, useState } from 'react'

import type { ProfilePlugin } from '../../../types.js'
import { FileImport } from './FileImport.js'
import { useFileManagementCommands } from './FileTreeCommands.hooks.js'
import {
	CollapsedButton,
	collapsedButtonStyles,
	CollapsedCommands,
	Commands,
	icons,
	useCommandbarStyles,
} from './FileTreeCommands.styles.js'
import { FileTreeTooltip } from './FileTreeTooltip.js'
import type { FileDefinition } from './ResourcesPane.types.js'

export interface FileTreeCommandsProps {
	expanded: boolean
	examples: FileDefinition[]
	plugins: Map<string, ProfilePlugin>
}
export const FileTreeCommands: React.FC<FileTreeCommandsProps> = memo(
	function FileTreeCommands({ expanded, examples, plugins }) {
		const commandBarStyles = useCommandbarStyles()
		const [file, setFile] = useState<BaseFile | undefined>()
		const { commands, openCommands, newCommands, saveCommands } =
			useFileManagementCommands(examples, expanded, setFile, plugins)

		return (
			<>
				<FileImport file={file} setFile={setFile} />
				{expanded ? (
					<Commands items={commands} styles={commandBarStyles} />
				) : (
					<CollapsedCommands>
						<FileTreeTooltip content="New">
							<CollapsedButton
								styles={collapsedButtonStyles}
								iconProps={icons.newFile}
								menuProps={{
									items: newCommands,
								}}
							/>
						</FileTreeTooltip>
						<FileTreeTooltip content="Open">
							<CollapsedButton
								styles={collapsedButtonStyles}
								iconProps={icons.openFile}
								menuProps={{
									items: openCommands,
								}}
							/>
						</FileTreeTooltip>
						<FileTreeTooltip content="Save">
							<CollapsedButton
								styles={collapsedButtonStyles}
								iconProps={icons.save}
								menuProps={{
									items: saveCommands,
								}}
							/>
						</FileTreeTooltip>
					</CollapsedCommands>
				)}
			</>
		)
	},
)
