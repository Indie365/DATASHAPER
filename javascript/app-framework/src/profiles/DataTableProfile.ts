/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { KnownProfile } from '@datashaper/schema'
import { DataTable } from '@datashaper/workflow'

import { DataTableEditor, RawTableViewer } from '../components/editors/index.js'
import type { GeneratedExtraRoutes, ProfilePlugin } from '../types.js'
import { ResourceGroupType } from '../types.js'

export class DataTableProfile implements ProfilePlugin<DataTable> {
	public readonly profile = KnownProfile.DataTable
	public readonly title = 'Datatable'
	public readonly renderer = DataTableEditor
	public readonly iconName = 'PageData'
	public readonly group = ResourceGroupType.Data
	public readonly dataHandler = null

	public createResource(): DataTable {
		return new DataTable()
	}

	public getRoutes(
		resource: DataTable,
		pathContext: string,
	): GeneratedExtraRoutes | undefined {
		const dataPath = Array.isArray(resource.path)
			? resource.path[0]
			: resource.path
		if (dataPath != null) {
			const pathItems = dataPath.split('/') ?? []
			const lastPathItem = pathItems[pathItems.length - 1]
			if (lastPathItem != null) {
				return {
					preItemSiblings: [
						{
							title: lastPathItem,
							href: `${pathContext}/${lastPathItem}`,
							icon: 'Database',
							renderer: RawTableViewer,
							props: { dataTable: resource },
						},
					],
				}
			}
		}
	}
}
