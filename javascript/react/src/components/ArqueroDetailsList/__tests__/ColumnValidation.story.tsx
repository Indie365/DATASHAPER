/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Field, ValidationResult } from '@datashaper/schema'
import { generateCodebook, validateTable } from '@datashaper/tables'
import type { ComponentStory } from '@storybook/react'

import { ArqueroDetailsList } from '../ArqueroDetailsList.js'
import type { ArqueroDetailsListProps } from '../ArqueroDetailsList.types.js'

export const ColumnValidationStory: ComponentStory<
	typeof ArqueroDetailsList
> = (
	args: ArqueroDetailsListProps,
	{ loaded: { companiesRaw } }: any,
): JSX.Element => {
	const codebookResult = generateCodebook(companiesRaw)
	// get the metadata so we can test this with full smart features to make sure everything lines up nicely
	const metadata = {
		rows: companiesRaw.numRows(),
		cols: companiesRaw.numCols(),
		columns: codebookResult.fields.reduce((acc, field) => {
			acc[field.name] = field
			return acc
		}, {} as Record<string, Field>),
	}
	// inject a few constraints to test & render
	codebookResult.fields.find(element => element.name === 'ID')!.constraints = {
		required: true,
		unique: true,
		minimum: 2,
		maximum: 3,
	}
	codebookResult.fields.find(element => element.name === 'Name')!.constraints =
		{
			enum: ['Microsoft', 'Apple', 'Google'],
		}
	codebookResult.fields.find(
		element => element.name === 'Employees',
	)!.constraints = {
		minimum: 160000,
	}

	const validationResult: ValidationResult = validateTable(
		companiesRaw,
		codebookResult,
		false,
	)

	return (
		<ArqueroDetailsList
			features={{
				smartCells: true,
			}}
			{...args}
			table={companiesRaw}
			metadata={metadata}
			validationResult={validationResult}
		/>
	)
}
ColumnValidationStory.storyName = 'Column validation'
