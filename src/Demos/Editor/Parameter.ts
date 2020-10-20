// Outcue, LLC Confidential Information.
// TM and (c) 2018-present Outcue, LLC  All Rights Reserved.
// Reproduction in whole or in part without prior written permission of a
// duly authorized representative is prohibited.

import * as Type from './NodeTypes'

// NOTE: Add new items to the end. Changing the order will break saved
// files as the enum index is used when serializing.
const enum ParamType {
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

export type eParamValue = any

export class Parameter {

    private description: string
    private isConnected = false
    private isAnimatable = false
    private isAnimated = false

    private defaultValue: eParamValue
    private baseValue: eParamValue

    constructor(
        readonly type: ParamType,
        readonly name: string,
        readonly min: number,
        readonly max: number) {
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
        if (this.type != ParamType.BOOL) { throw 'Not a boolean' }
        return this.baseValue as boolean
    }

    getValueAsEnum(): BigInt {
        if (this.type != ParamType.ENUM) { throw 'Not an enum' }
        return this.baseValue as BigInt
    }

    getValueAsFlags(): BigInt {
        if (this.type != ParamType.FLAGS) { throw 'Not a flag' }
        return this.baseValue as BigInt

    }

    getValueAsString(): string {
        if (this.type != ParamType.STRING) { throw 'Not a string' }
        return this.baseValue as string
    }

    getValueAsFloat(): number {
        if (this.type != ParamType.FLOAT) { throw 'Not a float' }
        return this.baseValue as number
    }

    getValueAsFXY(): Type.FXY {
        if (this.type != ParamType.FXY) { throw 'Not a matrix' }
        return this.baseValue as Type.FXY
    }

    getValueAsFXYZ(): Type.FXYZ {
        if (this.type != ParamType.FXYZ) { throw 'Not a matrix' }
        return this.baseValue as Type.FXYZ
    }

    getValueAsFXYZW(): Type.FXYZW {
        if (this.type != ParamType.FXYZW) { throw 'Not a matrix' }
        return this.baseValue as Type.FXYZW
    }

    getValueAsInt(): number {
        if (this.type != ParamType.INT) { throw 'Not an integer' }
        return this.baseValue as number
    }

    getValueAsIXY(): Type.IXY {
        if (this.type != ParamType.IXY) { throw 'Not a matrix' }
        return this.baseValue as Type.IXY
    }

    getValueAsIXYZ(): Type.IXYZ {
        if (this.type != ParamType.IXYZ) { throw 'Not a matrix' }
        return this.baseValue as Type.IXYZ
    }

    getValueAsIXYZW(): Type.IXYZW {
        if (this.type != ParamType.IXYZW) { throw 'Not a matrix' }
        return this.baseValue as Type.IXYZW
    }

    // eColor getValueAsColor() const ;
    // eFont getValueAsFont() const ;
}
