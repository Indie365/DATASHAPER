/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type ColumnTable from 'arquero/dist/types/table/column-table'
import type { TableStore } from '../../index.js'
import { SetOp, Step } from '../../types.js'
import { set } from '../util/index.js'

/**
 * Executes an arquero table union.
 * @param step
 * @param store
 * @returns
 */
export async function union(
	step: Step,
	store: TableStore,
): Promise<ColumnTable> {
	return set(step, store, SetOp.Union)
}
