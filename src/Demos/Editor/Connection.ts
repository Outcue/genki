// Copyright 2020-present Genki contributors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { makeUUID, NodeData } from './NodeData'
import { Node } from './Node'
import { NodeDataType } from './NodeData'
import { oppositePort } from './PortType'

import { InvalidPort, PortIndex, PortType } from './PortType'

/// Stores the currently dragged end.
/// Remembers last hovered node.
export class ConnectionState {

    private _requiredPort = PortType.None
    private _lastHoveredNode: Node | null = null

    setRequiredPort(end: PortType) {
        this._requiredPort = end
    }

    requiredPort() {
        return this._requiredPort
    }

    requiresPort(): boolean {
        return this._requiredPort != PortType.None
    }

    setNoRequiredPort() {
        this._requiredPort = PortType.None
    }

    interactWithNode(node: Node) {
        if (node) {
            this._lastHoveredNode = node
        } else {
            this.resetLastHoveredNode()
        }
    }

    setLastHoveredNode(node: Node) {
        this._lastHoveredNode = node
    }

    lastHoveredNode(): Node | null {
        return this._lastHoveredNode
    }

    resetLastHoveredNode() {
        if (this._lastHoveredNode) {
            this._lastHoveredNode.resetReactionToConnection()
        }

        this._lastHoveredNode = null
    }

}

export class Connection {

    readonly id = makeUUID()

    private _inNode?: Node
    private _outNode?: Node
    private _inPortIndex = InvalidPort
    private _outPortIndex = InvalidPort
    private _connectionState = new ConnectionState()

    constructor(portType: PortType, node: Node, portIndex: PortIndex) {
        this.setNodeToPort(node, portType, portIndex);
        this.setRequiredPort(oppositePort(portType));
    }

    setRequiredPort(dragging: PortType) {
        this._connectionState.setRequiredPort(dragging)

        switch (dragging) {
            case PortType.Out:
                this._outNode = undefined
                this._outPortIndex = InvalidPort
                break

            case PortType.In:
                this._inNode = undefined
                this._inPortIndex = InvalidPort
                break

            default:
                break
        }
    }

    setNodeToPort(node: Node,
        portType: PortType,
        portIndex: PortIndex) {
        //const nodeWeak = this.getNode(portType)
        if (portType == PortType.Out) {
            this._outPortIndex = portIndex
        } else {
            this._inPortIndex = portIndex
        }

        this._connectionState.setNoRequiredPort();
    }

    removeFromNodes() {
        if (this._inNode)
            this._inNode.nodeState.eraseConnection(
                PortType.In,
                this._inPortIndex,
                this.id)

        if (this._outNode)
            this._outNode.nodeState.eraseConnection(
                PortType.Out,
                this._outPortIndex,
                this.id)
    }

    getNode(portType: PortType): Node | undefined {

        switch (portType) {
            case PortType.In:
                return this._inNode

            case PortType.Out:
                return this._outNode

            default:
                break
        }

        return undefined
    }

    clearNode(portType: PortType) {

        if (portType == PortType.In) {
            this._inNode = undefined
            this._inPortIndex = InvalidPort
        } else {
            this._outNode = undefined
            this._outPortIndex = InvalidPort
        }
    }

    dataType(portType: PortType): NodeDataType {
        if (this._inNode && this._outNode) {
            const isPortIn = portType == PortType.In
            const model = isPortIn ? this._inNode.nodeDataModel : this._outNode.nodeDataModel
            const index = isPortIn ? this._inPortIndex : this._outPortIndex
            return model.dataType(portType, index)
        } else {
            if (this._inNode) {
                portType = PortType.In
                return this._inNode.nodeDataModel.dataType(
                    portType,
                    this._inPortIndex)
            } else if (this._outNode) {
                portType = PortType.Out
                return this._outNode.nodeDataModel.dataType(
                    portType,
                    this._outPortIndex)
            } else {
                throw new Error("Unreachable")
            }
        }
    }

    // MARK: - Signals

    propagateData(nodeData: NodeData) {
        if (this._inNode) {
            this._inNode.propagateData(nodeData, this._inPortIndex)
        }
    }

    propagateEmptyData() {
        this.propagateData(new NodeData());
    }
}