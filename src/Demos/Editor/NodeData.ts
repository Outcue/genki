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

import { NodeStyle } from './NodeStyle'
import { Parameter } from './Parameter'
import { PortIndex, PortType } from './PortType'

export class NodeDataType {
    id = ""
    name = ""
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

export const enum NodeValidationState {
    Valid,
    Warning,
    Error
}

export const enum ConnectionPolicy {
    One,
    Many
}

export interface NodeDataModel {

    initialize(): void
    nPorts(portType: PortType): number
    dataType(portType: PortType, portIndex: PortIndex): NodeDataType
    outData(port: PortIndex): NodeData
    setInData(nodeData: NodeData, index: PortIndex): void
    caption(): string
    captionVisible(): boolean
    portCaption(type: PortType, index: PortIndex): string
    portCaptionVisible(type: PortType, index: PortIndex): boolean
    validationState(): NodeValidationState
    validationMessage(): string
    nodeStyle(): NodeStyle
}

interface NodeDataModelStatic {
    new(): NodeDataModel
    Name(): string
    Type(): string
}

class Port {

    public data?: NodeData

    constructor(
        readonly type: PortType,
        readonly dataType: NodeDataType,
        readonly name: string,
        readonly nodeClass: NodeClass) {
    }
}

export function makeUUID() {
    // Reference: https://stackoverflow.com/a/2117523/709884
    return ("10000000-1000-4000-8000-100000000000").replace(/[018]/g, s => {
        const c = Number.parseInt(s, 10)
        return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    })
}

export function staticImplements<T>() {
    return <U extends T>(constructor: U) => { constructor };
}

@staticImplements<NodeDataModelStatic>()
export class BaseNode implements NodeDataModel {

    private _id = makeUUID()
    private _inputs = new Array<Port>()
    private _outputs = new Array<Port>()
    private _parameters = new Array<Parameter>()

    public static Name(): string {
        return ""
    }

    public static Type(): string {
        return ""
    }
    initialize(): void {
    }

    caption(): string {
        const name = this.name().length <= 0 ? "" : " : " + this.name()
        return this.type() + name;
    }

    captionVisible(): boolean {
        return true
    }

    portCaption(_: PortType, __: PortIndex): string {
        return ""
    }

    portCaptionVisible(_: PortType, __: PortIndex): boolean {
        return false
    }

    validationState(): NodeValidationState {
        return NodeValidationState.Valid
    }

    validationMessage(): string {
        return ""
    }

    nPorts(portType: PortType): number {

        switch (portType) {

            case PortType.In:
                return this._inputs.length

            case PortType.Out:
                return this._outputs.length

            default:
                return 0
        }
    }

    dataType(portType: PortType, portIndex: PortIndex): NodeDataType {

        switch (portType) {

            case PortType.In:
                return this._inputs[portIndex].dataType

            case PortType.Out:
                return this._outputs[portIndex].dataType

            default:
                return new NodeDataType()
        }
    }

    outData(port: PortIndex): NodeData {
        return new NodeData()
    }

    setInData(nodeData: NodeData, index: PortIndex) {
        this._inputs[index].data = nodeData
        this.inDataSet(index)
        this.process()
    }

    inDataSet(index: PortIndex) {
    }

    process() {
    }

    portOutConnectionPolicy(index: PortIndex): ConnectionPolicy {
        return ConnectionPolicy.Many
    }

    resizable(): boolean { return false }

    getID(): string { return this._id }
    setID(inId: string): void { this._id = inId }

    nodeStyle(): NodeStyle {
        return new NodeStyle()
    }

    // observable::subject < void (PortIndex) > dataUpdated;
}







