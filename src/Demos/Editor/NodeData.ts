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

import { PortIndex, PortType } from './PortType'

export class NodeDataType {
    id: String
    name: String
}

/// Class represents data transferred between nodes.
/// @param type is used for comparing the types
/// The actual data is stored in subtypes
class NodeData {

    private _type: NodeDataType

    type(): NodeDataType {
        return this._type
    }

    sameType(nodeData: NodeData): boolean {
        return this.type().id == nodeData.type().id
    }
}

const enum NodeValidationState {
    Valid,
    Warning,
    Error
}

const enum ConnectionPolicy {
    One,
    Many
}

interface NodeDataModel {

    initialize(): void

    name(): string
    type(): string
    nPorts(portType: PortType): number
    dataType(portType: PortType, portIndex: PortIndex): NodeDataType
    outData(port: PortIndex): NodeData
}

class BaseNode implements NodeDataModel {

    private _id: string

    initialize(): void {
    }

    name(): string { return "" }

    type(): string { return "" }

    nPorts(portType: PortType): number { return 0 }

    dataType(portType: PortType, portIndex: PortIndex): NodeDataType {
        return new NodeDataType()
    }

    outData(port: PortIndex): NodeData {
        return new NodeData()
    }

    portOutConnectionPolicy(index: PortIndex): ConnectionPolicy {
        return ConnectionPolicy.Many
    }

    resizable(): boolean { return false }

    validationState(): NodeValidationState { return NodeValidationState.Valid }
    validationMessage(): string { return "" }

    getID(): string { return this._id }
    setID(inId: string): void { this._id = inId }

    // observable::subject < void (PortIndex) > dataUpdated;
}







