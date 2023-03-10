/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Step } from '@datashaper/workflow'

import {
	AggregateForm,
	BinarizeForm,
	BinForm,
	BooleanLogicForm,
	ConvertForm,
	DeriveForm,
	EncodeDecodeForm,
	EraseForm,
	FillForm,
	FilterForm,
	FoldForm,
	ImputeForm,
	JoinForm,
	LookupForm,
	MergeForm,
	NoParametersForm,
	OneHotForm,
	OrderbyForm,
	PivotForm,
	RecodeForm,
	RenameForm,
	RollupForm,
	SampleForm,
	SetOperationForm,
	SpreadForm,
	UnfoldForm,
	UnhotForm,
	WindowForm,
} from '../verbs/forms/index.js'
import type { StepFormProps } from '../verbs/index.js'

const verb: Record<string, React.FC<StepFormProps<any>>> = {
	aggregate: AggregateForm,
	bin: BinForm,
	binarize: BinarizeForm,
	boolean: BooleanLogicForm,
	concat: SetOperationForm,
	convert: ConvertForm,
	dedupe: NoParametersForm,
	derive: DeriveForm,
	difference: SetOperationForm,
	decode: EncodeDecodeForm,
	encode: EncodeDecodeForm,
	erase: EraseForm,
	fill: FillForm,
	filter: FilterForm,
	fold: FoldForm,
	groupby: NoParametersForm,
	intersect: SetOperationForm,
	impute: ImputeForm,
	join: JoinForm,
	lookup: LookupForm,
	merge: MergeForm,
	onehot: OneHotForm,
	orderby: OrderbyForm,
	pivot: PivotForm,
	recode: RecodeForm,
	rename: RenameForm,
	rollup: RollupForm,
	sample: SampleForm,
	select: NoParametersForm,
	spread: SpreadForm,
	unfold: UnfoldForm,
	ungroup: NoParametersForm,
	unhot: UnhotForm,
	union: SetOperationForm,
	unorder: NoParametersForm,
	unroll: NoParametersForm,
	window: WindowForm,
}

/**
 * Given a Step definition, returns the correct React component function.
 * @param step -
 */
export function selectStepForm(
	step: Step<unknown>,
): React.FC<StepFormProps<unknown>> {
	const result = verb[step.verb]
	if (!result) {
		throw new Error(`verb ${step.verb} not found`)
	}
	return result
}
