/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { CodebookSchema } from '../codebook/CodebookSchema.js'
import type { DataType, Value } from '../data.js'
import type { SortDirection } from '../enums/index.js'

export enum Verb {
	Aggregate = 'aggregate',
	Bin = 'bin',
	Binarize = 'binarize',
	Boolean = 'boolean',
	Concat = 'concat',
	Convert = 'convert',
	Dedupe = 'dedupe',
	Derive = 'derive',
	Difference = 'difference',
	Decode = 'decode',
	Encode = 'encode',
	Erase = 'erase',
	Fetch = 'fetch',
	Fill = 'fill',
	Filter = 'filter',
	Fold = 'fold',
	Groupby = 'groupby',
	Impute = 'impute',
	Intersect = 'intersect',
	Join = 'join',
	Lookup = 'lookup',
	Merge = 'merge',
	Onehot = 'onehot',
	Orderby = 'orderby',
	Pivot = 'pivot',
	Recode = 'recode',
	Rename = 'rename',
	Rollup = 'rollup',
	Sample = 'sample',
	Select = 'select',
	Spread = 'spread',
	Unfold = 'unfold',
	Ungroup = 'ungroup',
	Unhot = 'unhot',
	Union = 'union',
	Unorder = 'unorder',
	Unroll = 'unroll',
	Window = 'window',
}

export interface InputColumnArgs {
	/**
	 * Name of the input column for columnnar operations.
	 */
	column: string
	dataType?: DataType
}

/**
 * Base interface for a number of operations that work on a column list.
 */
export interface InputColumnListArgs {
	columns: string[]
}

export interface InputColumnRecordArgs {
	/**
	 * Map of old column to new column names
	 */
	columns: Record<string, string>
}

export interface InputKeyValueArgs {
	/**
	 * Key column for the operation
	 */
	key: string
	/**
	 * Value column for the operation
	 */
	value: string
}

export interface OutputColumnArgs {
	/**
	 * Name of the output column to receive the operation's result.
	 */
	to: string
}

export interface Criterion {
	/**
	 * Comparison value for the column.
	 * Not required if the operator is self-defining (e.g., 'is empty')
	 */
	value?: Value
	/**
	 * Indicates whether the filter should be directly against a value,
	 * or against the value of another column
	 */
	type: FilterCompareType
	operator:
		| NumericComparisonOperator
		| StringComparisonOperator
		| BooleanComparisonOperator
		| DateComparisonOperator
}

/**
 * This is a subset of data types available for parsing operations
 */
export enum ParseType {
	Boolean = 'boolean',
	Date = 'date',
	Integer = 'int',
	/**
	 * Arquero has a parse_float and parse_int.
	 * While both are a 'number' in JavaScript, the distinction
	 * allows users to control how a string is interpreted.
	 */
	Decimal = 'float',
	String = 'string',
	Array = 'array',
}

export enum MathOperator {
	Add = '+',
	Subtract = '-',
	Multiply = '*',
	Divide = '/',
}

export enum NumericComparisonOperator {
	Equals = '=',
	NotEqual = '!=',
	LessThan = '<',
	LessThanOrEqual = '<=',
	GreaterThan = '>',
	GreaterThanOrEqual = '>=',
	IsEmpty = 'is empty',
	IsNotEmpty = 'is not empty',
}

export enum DateComparisonOperator {
	Equals = 'equals',
	NotEqual = 'is not equal',
	Before = 'before',
	After = 'after',
	IsEmpty = 'is empty',
	IsNotEmpty = 'is not empty',
}

export enum StringComparisonOperator {
	Equals = 'equals',
	NotEqual = 'is not equal',
	Contains = 'contains',
	StartsWith = 'starts with',
	EndsWith = 'ends with',
	IsEmpty = 'is empty',
	IsNotEmpty = 'is not empty',
	RegularExpression = 'regex',
}

export enum BooleanComparisonOperator {
	Equals = 'equals',
	NotEqual = 'is not equal',
	IsTrue = 'is true',
	IsFalse = 'is false',
	IsEmpty = 'is empty',
	IsNotEmpty = 'is not empty',
}

export enum BooleanOperator {
	/**
	 * Any match sets the result to true
	 */
	OR = 'or',
	/**
	 * All conditions must match for the result to be true
	 */
	AND = 'and',
	/**
	 * None of the conditions can match for the result to be true
	 */
	NOR = 'nor',
	/**
	 * Any number conditions can match but not all of them for the result to be true
	 */
	NAND = 'nand',
	/**
	 * Every pairwise comparison must contain one true and one false value
	 */
	XOR = 'xor',
	/**
	 * Every pairwise comparison must two true or two false to be true
	 */
	XNOR = 'xnor',
}

export enum SetOp {
	Concat = 'concat',
	Union = 'union',
	Intersect = 'intersect',
	Difference = 'difference',
}

export enum FilterCompareType {
	Value = 'value',
	Column = 'column',
}

/**
 * This is the subset of aggregate functions that can operate
 * on a single field so we don't accommodate additional args.
 * See https://uwdata.github.io/arquero/api/op#aggregate-functions
 */
export enum FieldAggregateOperation {
	Any = 'any',
	Count = 'count',
	CountDistinct = 'distinct',
	Valid = 'valid',
	Invalid = 'invalid',
	Max = 'max',
	Min = 'min',
	Sum = 'sum',
	Product = 'product',
	Mean = 'mean',
	Mode = 'mode',
	Median = 'median',
	StandardDeviation = 'stdev',
	StandardDeviationPopulation = 'stdevp',
	Variance = 'variance',
	CreateArray = 'array_agg',
	CreateArrayDistinct = 'array_agg_distinct',
}

/**
 * These are operations that perform windowed compute.
 * See https://uwdata.github.io/arquero/api/op#window-functions
 */
export enum WindowFunction {
	RowNumber = 'row_number',
	Rank = 'rank',
	PercentRank = 'percent_rank',
	CumulativeDistribution = 'cume_dist',
	FirstValue = 'first_value',
	LastValue = 'last_value',
	FillDown = 'fill_down',
	FillUp = 'fill_up',
}

export interface AggregateArgs extends RollupArgs {
	/**
	 * Column to group by
	 */
	groupby: string
}

export enum BinStrategy {
	Auto = 'auto',
	Fd = 'fd',
	Doane = 'doane',
	Scott = 'scott',
	Rice = 'rice',
	Sturges = 'sturges',
	Sqrt = 'sqrt',
	FixedCount = 'fixed count',
	FixedWidth = 'fixed width',
}

export interface BinArgs extends InputColumnArgs, OutputColumnArgs {
	strategy: BinStrategy
	/**
	 * Fixed number of bins.
	 * Note that the bin placements are inclusive of the bottom boundary and exclusive of the top boundary -
	 * this means there is always one extra bin for the max value when using fixed count.
	 */
	fixedcount?: number
	/**
	 * Exact step size between bins
	 */
	fixedwidth?: number
	/**
	 * Min boundary to categorize values into.
	 * If cell values are below this, they will default to -Infinity unless clamped.
	 */
	min?: number
	/**
	 * Max boundary to categorize values into.
	 * If cell values are above this, they will default to +Infinity unless clamped.
	 */
	max?: number
	/**
	 * If true, values outside of the min/max boundaries will be clamped to those
	 * boundaries rather than +/-Infinity.
	 */
	clamped?: boolean
	/**
	 * If true, the range for each bin will be printed as the cell value instead of the truncated numeric value.
	 * This is useful for treating the
	 */
	printRange?: boolean
}

export interface BinarizeArgs extends FilterArgs, OutputColumnArgs {}

export interface BooleanArgs extends InputColumnListArgs, OutputColumnArgs {
	operator: BooleanOperator
}

export interface ConvertArgs extends InputColumnArgs, OutputColumnArgs {
	type: ParseType
	/**
	 * Optional radix to use for parsing strings into ints
	 */
	radix?: number

	delimiter?: string

	formatPattern?: string
}

export type DedupeArgs = Partial<InputColumnListArgs>

export interface DeriveArgs extends OutputColumnArgs {
	/**
	 * Column on the left side of the operation
	 */
	column1: string
	/**
	 * Column on the right side of the operation
	 */
	column2: string

	operator: MathOperator
}

export interface EraseArgs extends InputColumnArgs {
	value: Value
}

export interface EncodeDecodeArgs {
	strategy: CodebookStrategy

	codebook: CodebookSchema
}

export interface FetchArgs {
	/**
	 * URL where the csv file is located
	 */
	url: string
	/**
	 * Optional delimiter for csv
	 */
	delimiter?: string
	/**
	 * Optional autoMax for tables
	 */
	autoMax?: number
}

export interface FillArgs extends OutputColumnArgs {
	/**
	 * Value to fill in the new column
	 */
	value: Value
}

export interface FilterArgs extends InputColumnArgs {
	criteria: Criterion[]
	logical?: BooleanOperator
}

export interface FoldArgs extends InputColumnListArgs {
	/**
	 * Two-element array of names for the output [key, value]
	 */
	to?: [string, string]
}

export type GroupbyArgs = InputColumnListArgs

export interface ImputeArgs extends InputColumnArgs {
	/**
	 * Value to fill in empty cells
	 */
	value: Value
}

export interface JoinArgsBase {
	/**
	 * Column names to join with.
	 * If only one is specified, it will use for both tables.
	 * If none are specified, all matching column names will be used.
	 */
	on?: string[]
}

export interface JoinArgs extends JoinArgsBase {
	strategy?: JoinStrategy
}

export enum JoinStrategy {
	Inner = 'inner',
	LeftOuter = 'left outer',
	RightOuter = 'right outer',
	FullOuter = 'full outer',
	Cross = 'cross',
	SemiJoin = 'semi join',
	AntiJoin = 'anti join',
}

export enum CodebookStrategy {
	DataTypeOnly = 'data type only',
	MappingOnly = 'mapping only',
	DataTypeAndMapping = 'data type and mapping',
}

export interface LookupArgs extends JoinArgsBase, InputColumnListArgs {}

export enum MergeStrategy {
	FirstOneWins = 'first one wins',
	LastOneWins = 'last one wins',
	Concat = 'concat',
	CreateArray = 'array',
}

export interface MergeArgs extends InputColumnListArgs, OutputColumnArgs {
	strategy: MergeStrategy
	/**
	 * This is only necessary if mergeStrategy.Concat is used.
	 * If it is not supplied, the values are just mashed together.
	 */
	delimiter?: string
	unhot?: boolean
	prefix?: string
	preserveSource?: boolean
}

export interface OnehotArgs extends InputColumnArgs {
	/**
	 * Optional prefixes for the output column names
	 */
	prefix?: string
	preserveSource?: boolean
}

export interface OrderbyArgs {
	/**
	 * List of ordering instructions to apply
	 */
	orders: OrderbyInstruction[]
}

export interface OrderbyInstruction {
	column: string
	direction?: SortDirection
}

export interface PivotArgs extends InputKeyValueArgs {
	operation: FieldAggregateOperation
}

export interface RecodeArgs extends InputColumnArgs, OutputColumnArgs {
	/**
	 * Mapping of old value to new for the recoding.
	 * Note that the key must be coercable to a string for map lookup.
	 */
	mapping: Record<Value, Value>
}

export type RenameArgs = InputColumnRecordArgs

export interface RollupArgs extends InputColumnArgs, OutputColumnArgs {
	/**
	 * Aggregate/rollup operation
	 */
	operation: FieldAggregateOperation
}

export interface SampleArgs {
	/**
	 * Number of rows to sample from the table.
	 * This takes precedence over proportion.
	 */
	size?: number
	/**
	 * If table size is unknown ahead of time, specify a proportion of rows to sample.
	 * If size is specified, it will be used instead, otherwise computed from this
	 * proportion using the table.numRows()
	 */
	proportion?: number
}

export type SelectArgs = InputColumnListArgs

export interface SpreadArgs extends InputColumnArgs {
	to: string[]
	/**
	 * Delimiter to use when converting string cell values into an array with String.split
	 */
	delimiter?: string
	/**
	 * Indicates that a onehot-style spread should be performed.
	 * This maps all unique cell values to new columns and sets the output cell value to a binary 1/0 based on column match.
	 * This is in contrast to the default spread, which just maps array values to column by index.
	 */
	onehot?: boolean
	preserveSource?: boolean
}

export type UnfoldArgs = InputKeyValueArgs

export interface UnhotArgs extends InputColumnListArgs, OutputColumnArgs {
	prefix?: string
	preserveSource?: boolean
}

export type UnrollArgs = InputColumnListArgs

export interface WindowArgs extends InputColumnArgs, OutputColumnArgs {
	operation: WindowFunction
}
