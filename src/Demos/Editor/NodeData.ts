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

import * as Type from './NodeTypes'

import { NodeStyle } from './NodeStyle'
import { Parameter, ParameterType } from './Parameter'
import { PortIndex, PortType } from './PortType'

export class NodeDataType {

    constructor(
        readonly id: string,
        readonly name: string) {
    }
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
/// type is used for comparing the types
/// The actual data is stored in subtypes
export class NodeData {

    private _type: NodeDataType

    constructor(id: string, name: string) {
        this._type = new NodeDataType(id, name)
    }

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
    type(): string
    id(): string
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

export class BaseNode implements NodeDataModel {

    private _id = makeUUID()

    protected _name = "Unknown"
    protected _type = "Unknown"

    private _inputs = new Array<Port>()
    private _outputs = new Array<Port>()
    private _parameters = new Array<Parameter>()
    private _nodeStyle = new NodeStyle()

    initialize(): void {
    }

    id(): string {
        return this._id
    }

    name() {
        return this._name
    }

    type() {
        return this._type
    }

    caption(): string {
        const nodeName = this._name
        const name = nodeName.length <= 0 ? "" : " : " + nodeName
        return this._type + name;
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
                return new NodeDataType(this._id, this._name)
        }
    }

    outData(port: PortIndex): NodeData {
        return new NodeData(this._id, this._name)
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

    nodeStyle(): NodeStyle {
        return this._nodeStyle
    }

    // observable::subject < void (PortIndex) > dataUpdated

    addParameter<T>(
        type: ParameterType,
        name: string,
        min: number,
        max: number,
        value: T,
        animatable: boolean,
        group: string): void {

        const p = new Parameter(
            type,
            name,
            min,
            max,
            this,
            group);
        p.baseValue = value
        p.isAnimatable = animatable
        this._parameters.push(p)
    }

    ParamText(
        name: string,
        label: string,
        group: string) {
        this.addParameter<string>(
            ParameterType.TEXT,
            name,
            0,
            0,
            label,
            false,
            group)
    }

    ParamString(
        name: string,
        label: string,
        group: string) {
        this.addParameter<string>(
            ParameterType.STRING,
            name,
            0,
            0,
            label,
            false,
            group)
    }

    ParamInt(
        name: string,
        min: number,
        max: number,
        value: number,
        animatable: boolean,
        group: string) {
        this.addParameter<number>(
            ParameterType.INT,
            name,
            min,
            max,
            value,
            animatable,
            group)
    }

    ParamFloat(
        name: string,
        min: number,
        max: number,
        value: number,
        animatable: boolean,
        group: string) {
        this.addParameter<number>(
            ParameterType.FLOAT,
            name,
            min,
            max,
            value,
            animatable,
            group)
    }

    ParamFXY(
        name: string,
        min: number,
        max: number,
        x: number,
        y: number,
        animatable: boolean,
        group: string) {
        this.addParameter<Type.FXY>(
            ParameterType.FLOAT,
            name,
            min,
            max,
            new Type.XY<number>(x, y),
            animatable,
            group)
    }

    ParamFXYZ(
        name: string,
        min: number,
        max: number,
        x: number,
        y: number,
        z: number,
        animatable: boolean,
        group: string) {
        this.addParameter<Type.FXYZ>(
            ParameterType.FLOAT,
            name,
            min,
            max,
            new Type.XYZ<number>(x, y, z),
            animatable,
            group)
    }

    ParamFXYZW(
        name: string,
        min: number,
        max: number,
        x: number,
        y: number,
        z: number,
        w: number,
        animatable: boolean,
        group: string) {
        this.addParameter<Type.FXYZW>(
            ParameterType.FLOAT,
            name,
            min,
            max,
            new Type.XYZW<number>(x, y, z, w),
            animatable,
            group)
    }
}









