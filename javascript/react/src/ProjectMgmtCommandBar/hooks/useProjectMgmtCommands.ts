/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import type { Specification } from '@data-wrangling-components/core'
import type { TableContainer } from '@essex/arquero'
import type { ICommandBarItemProps } from '@fluentui/react'
import { useMemo } from 'react'

import {
	useDownloadCsv,
	useDownloadWorkflow,
	useDownloadZip,
} from './downloads.js'
import {
	useHandleCsvUpload,
	useHandleJsonUpload,
	useHandleZipUpload,
} from './uploads.js'

export function useProjectMgmtCommands(
	workflow: Specification,
	tables: TableContainer[],
	outputTables: TableContainer[],
	onUpdateWorkflow: (workflow: Specification) => void,
	onUpdateTables: (tables: TableContainer[]) => void,
): ICommandBarItemProps[] {
	const downloadPipeline = useDownloadWorkflow(workflow)
	const downloadCsv = useDownloadCsv(outputTables)
	const downloadZip = useDownloadZip(workflow, tables, outputTables)
	const handleJsonUpload = useHandleJsonUpload(onUpdateWorkflow)
	const handleCsvUpload = useHandleCsvUpload(onUpdateTables)
	const handleZipUpload = useHandleZipUpload(onUpdateWorkflow, onUpdateTables)

	const commands: ICommandBarItemProps[] = useMemo(() => {
		return [
			{
				key: 'open',
				text: 'Open',
				iconProps: icons.openFile,
				subMenuProps: {
					items: [
						{
							key: 'csv',
							text: 'CSV table',
							iconProps: icons.table,
							onClick: handleCsvUpload,
						},
						{
							key: 'json',
							text: 'Pipeline (.json)',
							iconProps: icons.code,
							onClick: handleJsonUpload,
						},
						{
							key: 'zip',
							text: 'Zip project',
							iconProps: icons.zipFolder,
							onClick: handleZipUpload,
						},
					],
				},
			},
			{
				key: 'save',
				text: 'Save',
				iconProps: icons.save,
				subMenuProps: {
					items: [
						{
							key: 'csv',
							text: 'CSV table',
							iconProps: icons.table,
							onClick: downloadCsv,
						},
						{
							key: 'json',
							text: 'Pipeline (.json)',
							iconProps: icons.code,
							onClick: downloadPipeline,
						},
						{
							key: 'zip',
							text: 'Zip project',
							iconProps: icons.zipFolder,
							onClick: downloadZip,
						},
					],
				},
			},
		] as ICommandBarItemProps[]
	}, [
		downloadPipeline,
		downloadCsv,
		downloadZip,
		handleJsonUpload,
		handleCsvUpload,
		handleZipUpload,
	])

	return commands
}

const icons = {
	save: { iconName: 'Save' },
	openFile: { iconName: 'OpenFile' },
	table: { iconName: 'Table' },
	code: { iconName: 'Code' },
	zipFolder: { iconName: 'ZipFolder' },
}
