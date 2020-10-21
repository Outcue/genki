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

import { Parameter } from './Parameter'
import { PortIndex, PortType } from './PortType'

export class NodeDataType {
    id: String
    name: String
}

export const enum NodeClass {
    Animation,
    Color,
    Effect,
    Filter,
    Item,
    Integer,
    Path,
    Scalar,
    Scalar2D,
    Transition
}

/// Class represents data transferred between nodes.
/// @param type is used for comparing the types
/// The actual data is stored in subtypes
export class NodeData {

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

export interface NodeDataModel {

    initialize(): void

    name(): string
    type(): string
    nPorts(portType: PortType): number
    dataType(portType: PortType, portIndex: PortIndex): NodeDataType
    outData(port: PortIndex): NodeData
}

class Port {

    constructor(
        readonly type: PortType,
        readonly dataType: NodeDataType,
        readonly name: string,
        readonly nodeClass: NodeClass) {
    }
}

function makeUUID() {
    // Reference: https://stackoverflow.com/a/2117523/709884
    return ("10000000-1000-4000-8000-100000000000").replace(/[018]/g, s => {
        const c = Number.parseInt(s, 10)
        return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    })
}

export class BaseNode implements NodeDataModel {

    private _id = makeUUID()
    private _inputs = new Array<Port>()
    private _outputs = new Array<Port>()
    private _parameters = new Array<Parameter>()

    initialize(): void {
    }

    name(): string { return "" }

    type(): string { return "" }

    nPorts(portType: PortType): number {
        if (portType == PortType.In) {
            return this._inputs.length
        } else if (portType == PortType.Out) {
            return this._outputs.length
        } else {
            return {}
        }
    }

    dataType(portType: PortType, portIndex: PortIndex): NodeDataType {

        if (portType == PortType.In) {
            return this._inputs[portIndex].dataType
        } else if (portType == PortType.Out) {
            return this._outputs[portIndex].dataType
        } else {
            return NODE_DATA_TYPE[PT_NONE];
        }
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







