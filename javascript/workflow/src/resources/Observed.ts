/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Subject } from 'rxjs'

import type { Unsubscribe } from '../primitives.js'
import { Disposable } from './Disposable.js'

export abstract class Observed extends Disposable {
	protected _onChange = new Subject<void>()
	public onChange(handler: () => void, fireSync?: boolean): Unsubscribe {
		const sub = this._onChange.subscribe(handler)
		if (fireSync) {
			handler()
		}
		return () => sub.unsubscribe()
	}

	public override dispose(): void {
		this._onChange.complete()
		super.dispose()
	}
}
