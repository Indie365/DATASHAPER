/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { Observable } from 'rxjs'

export type NodeId = string | symbol
export type SocketName = string | symbol

/**
 * A convenience type for including undefined
 * @public
 */
export type Maybe<T> = T | undefined

/**
 * A graph processing node
 * @public
 */
export interface Node<T, Config = unknown> {
	/**
	 * A unique identifier for this node
	 */
	readonly id: NodeId
	/**
	 * The node's mutable configuration
	 */
	config: Maybe<Config>

	/**
	 * Named input sockets
	 */
	readonly inputs: SocketName[]

	/**
	 * Named output sockets, in addition to the implicit default output socket
	 */
	readonly outputs: SocketName[]

	/**
	 * Binds an input socket to an upstream node
	 * @param name - the name of the input socket
	 */
	bind(name: SocketName, binding: NodeBinding<T>): void

	/**
	 * Clear an input socket
	 * @param name - The input socket name
	 */
	unbind(name: SocketName): void

	/**
	 * Retrieves an existing input binding by id
	 */
	input(input: SocketName): Maybe<NodeBinding<T>>

	/**
	 * Gets an output socket
	 * @param name - The name of the output socket. If undefined, this will use the implicit default output socket.
	 */
	output(name?: SocketName): Observable<Maybe<T>>

	/**
	 * Gets a current output value
	 * @param name - The output name. If undefined, this will use the implicit default output socket.
	 */
	outputValue(name?: SocketName): Maybe<T>

	/**
	 *
	 * @param handler The event handler for when the binding changes
	 */
	readonly onBindingsChanged: Observable<void>
}

/**
 * A binding for a value being emitted from a node
 */
export interface NodeBinding<T> {
	/**
	 * The node to bind
	 */
	node: Node<T>

	/**
	 * The named output
	 */
	output?: string
}

export interface GraphOrchestrator<T> {
	readonly nodeIds: string[]

	/**
	 * Retrieves a node by id.
	 * @param id - the node identifier
	 * @throws - if the id is not found
	 */
	getNodeWithId(id: string): Node<T>

	// TODO: Detect Cycles?
	// TODO: events for when nodes added, removed?
	// TODO: Expose Topologically important nodes like inputs & outputs?
}
