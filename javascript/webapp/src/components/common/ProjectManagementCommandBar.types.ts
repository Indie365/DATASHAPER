/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { TableContainer } from '@datashaper/tables'
import type { Workflow } from '@datashaper/workflow'
import type { ICommandBarItemProps, ICommandBarProps } from '@fluentui/react'

export interface ProjectManagementCommandBarProps
	extends Omit<ICommandBarProps, 'items'> {
	/**
	 * The data transformation workflow
	 */
	workflow: Workflow

	/**
	 * The input data tables
	 */
	tables: TableContainer[]

	/**
	 * The output data table
	 */
	outputTables: TableContainer[]

	/**
	 * Handler for when the workflow changes
	 */
	onUpdateWorkflow: (steps: Workflow) => void

	/**
	 * Handler for when input tableset changes
	 */
	onUpdateTables: (tables: TableContainer[]) => void
	/**
	 * Shared props to apply to each item
	 */
	itemProps?: Partial<ICommandBarItemProps>
}
