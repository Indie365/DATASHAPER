/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { StepComponent, StepDescription, useDataTable } from '@datashaper/react'
import { introspect } from '@datashaper/tables'
import { memo, useMemo } from 'react'

import { Section } from './Section.js'
import {
	OutputColumn,
	StepBlock,
	StepColumn,
	StepConfig,
	StepDisplay,
	TableSection,
} from './StepOutput.styles.js'
import type { StepOutputProps } from './StepOutput.types.js'
import { Table } from './Table.js'

export const StepOutput: React.FC<StepOutputProps> = memo(function StepOutput({
	step,
	index,
	workflow,
	output,
	onStepChange,
	onStepOutputChange,
}) {
	const table = useDataTable(output, workflow)
	const metadata = useMemo(() => table && introspect(table, true), [table])
	return (
		<StepBlock className="step-block">
			<Section title={`Step ${index + 1}`} subtitle={step.verb}>
				<StepColumn className="steps-column">
					<StepConfig>
						<StepComponent
							step={step}
							workflow={workflow}
							index={index}
							output={output}
							onChange={onStepChange}
							onChangeOutput={o => onStepOutputChange(step, o)}
						/>
					</StepConfig>
					<StepDisplay>
						<StepDescription step={step} output={output} />
					</StepDisplay>
				</StepColumn>
				<OutputColumn className="outputs-column">
					{table ? (
						<TableSection className="table-section">
							<Table
								name={output}
								table={table}
								metadata={metadata}
								compact
								features={{ smartHeaders: true, smartCells: true }}
							/>
						</TableSection>
					) : null}
				</OutputColumn>
			</Section>
		</StepBlock>
	)
})