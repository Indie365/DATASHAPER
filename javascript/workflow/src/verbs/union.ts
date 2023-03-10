/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { SetOp } from '@datashaper/schema'

import { setOperationNodeFactory } from './util/factories.js'

export const union = setOperationNodeFactory(SetOp.Union)
