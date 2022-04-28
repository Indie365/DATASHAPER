import { memo, useMemo, Fragment } from 'react'
import {
	Checkbox,
	Dropdown,
	IDropdownOption,
	Position,
	SpinButton,
} from '@fluentui/react'
import { Switch, Case } from 'react-if'
import {
	useCheckboxChangeHandler,
	useDropdownChangeHandler,
	useSpinButtonChangeHandler,
} from './hooks.js'
import type { StepChangeFunction } from '../types.js'
import type { Step } from '@data-wrangling-components/core'

export interface FormInputBase {
	/**
	 * The user-friendly form label
	 */
	label: string

	/**
	 * The placeholder text to show
	 */
	placeholder?: string

	/**
	 * Whether this input is required
	 */
	required?: boolean

	/**
	 * Whether this input is presented
	 */
	condition?: boolean

	/**
	 * An optional React component to wrap the input with
	 */
	wrapper?: React.ComponentType

	styles?: any
}

export interface SingleChoiceFormInput<T> extends FormInputBase {
	type: FormInputType.SingleChoice

	/**
	 * The form input options (required if type is enum)
	 */
	options?: IDropdownOption[]

	/**
	 * The form input value or selected key (if enum)
	 */
	current: number | string

	onChange: (step: Step<T>, optionKey: string | number | undefined) => void
}

export interface CheckboxFormInput<T> extends FormInputBase {
	type: FormInputType.Checkbox

	/**
	 * The form input value or selected key (if enum)
	 */
	current: boolean | undefined

	onChange: (step: Step<T>, optionKey: boolean | undefined) => void
}

export interface NumberSpinnerFormInput<T> extends FormInputBase {
	type: FormInputType.NumberSpinner
	min?: number
	max?: number
	step?: number
	/**
	 * The form input value or selected key (if enum)
	 */
	current: number | undefined
	onChange: (step: Step<T>, value: string | undefined) => void
}

export type FormInput<T> =
	| SingleChoiceFormInput<T>
	| NumberSpinnerFormInput<T>
	| CheckboxFormInput<T>

export enum FormInputType {
	SingleChoice = 'enum',
	NumberSpinner = 'number_spinner',
	Checkbox = 'checkbox',
}

export const VerbInput: React.FC<{
	inputs: FormInput<any>[]
	step: Step<any>
	onChange?: StepChangeFunction<any>
}> = memo(function VerbInput({ inputs, step, onChange }) {
	const rows = useMemo(
		() =>
			inputs.map((input, index) => (
				<Input
					input={input}
					step={step}
					onChange={onChange}
					key={`verb-${input.label}-${index}`}
				/>
			)),
		[inputs],
	)
	return <>{rows}</>
})

const Input: React.FC<{
	input: FormInput<unknown>
	step: Step<unknown>
	onChange?: StepChangeFunction<unknown>
}> = memo(function Input({ input, step, onChange }) {
	const condition = input.condition ?? true
	const inputType: FormInputType = input.type

	return condition == false ? null : (
		<Switch>
			<Case condition={inputType == FormInputType.SingleChoice}>
				<SingleChoiceInput
					input={input as SingleChoiceFormInput<unknown>}
					step={step}
					onChange={onChange}
				/>
			</Case>
			<Case condition={inputType === FormInputType.NumberSpinner}>
				<NumberSpinnerInput
					input={input as NumberSpinnerFormInput<unknown>}
					step={step}
					onChange={onChange}
				/>
			</Case>
			<Case condition={inputType == FormInputType.Checkbox}>
				<CheckboxInput
					input={input as CheckboxFormInput<unknown>}
					step={step}
					onChange={onChange}
				/>
			</Case>
		</Switch>
	)
})

const SingleChoiceInput: React.FC<{
	input: SingleChoiceFormInput<unknown>
	step: Step<unknown>
	onChange?: StepChangeFunction<unknown>
}> = memo(function SingleChoiceInput({
	step,
	input: {
		label,
		placeholder,
		current,
		required,
		options,
		wrapper: Wrapper = Fragment,
		onChange: updater,
	},
	onChange,
}) {
	const dropdownChangeHandler = useDropdownChangeHandler(
		step,
		updater,
		onChange,
	)
	return (
		<Wrapper>
			<Dropdown
				required={required}
				label={label}
				placeholder={placeholder}
				styles={dropdownStyles}
				selectedKey={current as number | string}
				options={options!}
				onChange={dropdownChangeHandler}
			/>
		</Wrapper>
	)
})

const NumberSpinnerInput: React.FC<{
	input: NumberSpinnerFormInput<unknown>
	step: Step<unknown>
	onChange?: StepChangeFunction<unknown>
}> = memo(function NumberSpinnerInput({
	step,
	input: {
		label,
		placeholder,
		current,
		min,
		max,
		step: spinStep,
		wrapper: Wrapper = Fragment,
		onChange: updater,
		styles,
	},
	onChange,
}) {
	const changeHandler = useSpinButtonChangeHandler(step, updater, onChange)
	return (
		<Wrapper>
			<SpinButton
				label={label}
				labelPosition={Position.top}
				placeholder={placeholder}
				min={min}
				max={max}
				step={spinStep}
				value={current ? `${current}` : undefined}
				onChange={changeHandler}
				styles={styles}
			/>
		</Wrapper>
	)
})

const CheckboxInput: React.FC<{
	input: CheckboxFormInput<unknown>
	step: Step<unknown>
	onChange?: StepChangeFunction<unknown>
}> = memo(function CheckboxInput({
	step,
	input: {
		label,
		current,
		wrapper: Wrapper = Fragment,
		onChange: updater,
		styles,
	},
	onChange,
}) {
	const changeHandler = useCheckboxChangeHandler(step, updater, onChange)
	console.log('checkbox label', label)
	return (
		<Wrapper>
			<Checkbox
				label={label}
				checked={current}
				onChange={changeHandler}
				styles={styles}
			/>
		</Wrapper>
	)
})

const dropdownStyles = {
	root: {
		width: 220,
	},
}
