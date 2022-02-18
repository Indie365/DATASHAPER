/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { table } from 'arquero'
import { TableStore } from '../../TableStore.js'

/**
 * This is a store implementation pre-loaded with test tables to ease setup.
 */
export class TestStore extends TableStore {
	constructor() {
		super()
		const table1 = table({
			ID: [1, 2, 3, 4, 5],
			name: ['A', 'B', 'C', 'D', 'E'],
			count: [10, 20, 30, 40, 50],
		})
		const table2 = table({
			ID: [6],
			name: ['F'],
			count: [60],
		})
		const table3 = table({
			ID: [1, 1, 2, 4, 4, 4],
			item: ['bed', 'pillow', 'sofa', 'sofa', 'chair', 'stool'],
		})
		const table4 = table({
			ID: [1, 1, 2, 4, 4, 4],
			item: ['bed', 'pillow', 'sofa', 'sofa', 'chair', 'stool'],
			quantity: [45, 78, 100, 89, 50, 45],
		})

		const table5 = table({
			ID: [1, 1, 2, 4, 4, 4],
			item: ['bed', null, 'sofa', 'sofa', 'chair', null],
			quantity: [45, 78, 100, 89, 50, 45],
		})

		const table6 = table({
			ID: [1, 2, 3, 4, 5, 6],
			FY20: [10000, 56000, 45000, 5000, 8900, 90000],
			FY21: [5000, 4000, 45000, 6000, 9000, 78000],
		})

		const table7 = table({
			ID: [1, 2, 3, 4, 5],
			item: ['bed', 'pillow', 'sofa', 'chair', 'stool'],
			quantity: [45, 78, 100, 89, 50],
			totalSale: [54000, 7800, 230000, 20470, 5000],
		})

		const table8 = table({
			ID: [4, 5, 6, 7, 8],
			name: ['D', 'E', 'F', 'G', 'H'],
			count: [80, 90, 100, 110, 120],
		})

		const table9 = table({
			count: [
				10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160,
				170, 180, 190, 200,
			],
		})

		const table10 = table({
			x: ['A', 'B', 'A'],
			y: [1, 2, 1],
			z: [4, 5, 4],
		})

		const table11 = table({
			x: ['A', 'B', 'A'],
			y: [1, undefined, 1],
			z: [4, 5, 4],
		})

		const table12 = table({
			ID: [1, 2, 3, 4, 5],
			item: ['bed', 'pillow', null, 'chair', 'stool'],
			quantity: [45, undefined, 100, 89, 50],
			totalSale: [54000, 7800, 230000, 20470, 5000],
		})

		const table13 = table({
			ID: [1, 2, 3, 4, 5],
			name: ['A', 'B', 'C', 'D', 'E'],
			description: ['XX', 'XT', 'QW', 'RE', 'FG'],
		})

		const table14 = table({
			x: ['A', 'B', 'A'],
			y: [1, undefined, 1],
			z: [true, false, false],
		})

		const table15 = table({
			x: ['A', 'B', 'A'],
			y: [null, true, false],
			z: [true, false, true],
		})

		const table16 = table({
			key: ['A', 'B', 'C'],
			value: [1, 2, 3],
		})

		const table17 = table({
			type: [1, 1, 1, 2, 2],
			name: ['A', 'A', 'B', 'A', 'B'],
			count: [1, 2, 3, 4, 5],
		})

		const table18 = table({
			A: [1, 3, 10],
			B: [2, 4, 20],
			C: [3, 5, 30],
		})

		this.set('table1', table1)
		this.set('table2', table2)
		this.set('table3', table3)
		this.set('table4', table4)
		this.set('table5', table5)
		this.set('table6', table6)
		this.set('table7', table7)
		this.set('table8', table8)
		this.set('table9', table9)
		this.set('table10', table10)
		this.set('table11', table11)
		this.set('table12', table12)
		this.set('table13', table13)
		this.set('table14', table14)
		this.set('table15', table15)
		this.set('table16', table16)
		this.set('table17', table17)
		this.set('table18', table18)
	}
}