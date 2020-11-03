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

import { Connection } from './Connection'
import { NodeDataModel, NodeDataType } from './NodeData'
import { PortIndex, PortType } from './PortType'

type ConnectionSet = Map<string, Connection>

const DefaultDataType = new NodeDataType("Default", "Default")

export const enum NodeConnectionReaction {
    Reacting,
    NotReacting
}

export class NodeState {

    private _inConnections: Array<ConnectionSet>
    private _outConnections: Array<ConnectionSet>
    private _reaction = NodeConnectionReaction.NotReacting
    private _reactingPortType = PortType.None
    private _reactingDataType?: NodeDataType
    private _resizing = false

    constructor(model: NodeDataModel) {
        this._inConnections = new Array<ConnectionSet>()
        for (var input = 0; input < model.nPorts(PortType.In); ++input) {
            this._inConnections.push(new Map<string, Connection>())
        }

        this._outConnections = new Array<ConnectionSet>()
        for (var output = 0; output < model.nPorts(PortType.Out); ++output) {
            this._outConnections.push(new Map<string, Connection>())
        }
    }

    connections(portType: PortType, portIndex: PortIndex) {
        const connections = this.getEntries(portType)
        return connections[portIndex]
    }

    getEntries(portType: PortType) {
        if (portType == PortType.In)
            return this._inConnections
        else
            return this._outConnections
    }

    setConnection(portType: PortType,
        portIndex: PortIndex,
        connection: Connection) {
        const connections = this.getEntries(portType);
        connections[portIndex] = new Map<string, Connection>([
            [connection.id, connection]
        ])
    }

    eraseConnection(
        portType: PortType,
        portIndex: PortIndex,
        id: string) {
        this.getEntries(portType)[portIndex].delete(id)
    }

    reaction(): NodeConnectionReaction {
        return this._reaction
    }

    reactingPortType(): PortType {
        return this._reactingPortType
    }

    reactingDataType(): NodeDataType {
        if (this._reactingDataType) {
            return this._reactingDataType
        } else {
            return DefaultDataType
        }
    }

    setReaction(
        reaction: NodeConnectionReaction,
        reactingPortType: PortType = PortType.None,
        reactingDataType: NodeDataType = DefaultDataType) {
        this._reaction = reaction
        this._reactingPortType = reactingPortType
        this._reactingDataType = reactingDataType
    }

    isReacting() {
        return this._reaction == NodeConnectionReaction.Reacting
    }

    setResizing(resizing: boolean) {
        this._resizing = resizing
    }

    resizing(): boolean {
        return this._resizing
    }
}
