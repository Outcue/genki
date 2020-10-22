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

    constructor(portType: PortType, node: Node, portIndex: PortIndex) {

    }

    propagateData(nodeData: NodeData) {
        if (this._inNode) {
            this._inNode.propagateData(nodeData, this._inPortIndex)
        }
    }

    propagateEmptyData() {
        this.propagateData(new NodeData());
    }
}