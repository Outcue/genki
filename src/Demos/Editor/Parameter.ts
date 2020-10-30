// Outcue, LLC Confidential Information.
// TM and (c) 2018-present Outcue, LLC  All Rights Reserved.
// Reproduction in whole or in part without prior written permission of a
// duly authorized representative is prohibited.

import * as Type from './NodeTypes'

import { BaseNode } from './NodeData'

// NOTE: Add new items to the end. Changing the order will break saved
// files as the enum index is used when serializing.
export const enum ParameterType {
    NONE,
    STRING,
    BOOL,
    FLAGS,
    ENUM,
    FLOAT,       // 5
    FXY,
    FXYZ,
    FXYZW,
    INT,
    IXY,         // 10
    IXYZ,
    IXYZW,
    FILE,
    TEXT,
    RGBA,        // 15
    FSLIDER,
    ISLIDER,
    BUTTON,
    FILESAVE,
    FONT,        // 20
    JSON
}

export type ParamValue = any

export class Parameter {

    public description = ""
    public isConnected = false
    public isAnimatable = false
    public isAnimated = false
    public defaultValue: ParamValue
    public baseValue: ParamValue

    constructor(
        readonly type: ParameterType,
        readonly name: string,
        readonly min: number,
        readonly max: number,
        readonly node: BaseNode,
        readonly group: string) {
    }

    setDescription(description: string) {
        this.description = description
    }

    getDescription(): string {
        return this.description
    }

    getDefaultValue() {
        return this.defaultValue
    }

    getBaseValue() {
        return this.baseValue
    }

    getValueAsBool(): boolean {
        if (this.type != ParameterType.BOOL) { throw 'Not a boolean' }
        return this.baseValue as boolean
    }

    getValueAsEnum(): BigInt {
        if (this.type != ParameterType.ENUM) { throw 'Not an enum' }
        return this.baseValue as BigInt
    }

    getValueAsFlags(): BigInt {
        if (this.type != ParameterType.FLAGS) { throw 'Not a flag' }
        return this.baseValue as BigInt

    }

    getValueAsString(): string {
        if (this.type != ParameterType.STRING) { throw 'Not a string' }
        return this.baseValue as string
    }

    getValueAsFloat(): number {
        if (this.type != ParameterType.FLOAT) { throw 'Not a float' }
        return this.baseValue as number
    }

    getValueAsFXY(): Type.FXY {
        if (this.type != ParameterType.FXY) { throw 'Not a matrix' }
        return this.baseValue as Type.FXY
    }

    getValueAsFXYZ(): Type.FXYZ {
        if (this.type != ParameterType.FXYZ) { throw 'Not a matrix' }
        return this.baseValue as Type.FXYZ
    }

    getValueAsFXYZW(): Type.FXYZW {
        if (this.type != ParameterType.FXYZW) { throw 'Not a matrix' }
        return this.baseValue as Type.FXYZW
    }

    getValueAsInt(): number {
        if (this.type != ParameterType.INT) { throw 'Not an integer' }
        return this.baseValue as number
    }

    getValueAsIXY(): Type.IXY {
        if (this.type != ParameterType.IXY) { throw 'Not a matrix' }
        return this.baseValue as Type.IXY
    }

    getValueAsIXYZ(): Type.IXYZ {
        if (this.type != ParameterType.IXYZ) { throw 'Not a matrix' }
        return this.baseValue as Type.IXYZ
    }

    getValueAsIXYZW(): Type.IXYZW {
        if (this.type != ParameterType.IXYZW) { throw 'Not a matrix' }
        return this.baseValue as Type.IXYZW
    }

    // eColor getValueAsColor() const ;
    // eFont getValueAsFont() const ;
}
