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

import { RectAttr } from '@svgdotjs/svg.js'

export const eU32_MAX = 0xffffffff
export const eS32_MIN = -2147483647 - 1
export const eS32_MAX = 2147483647
export const eU16_MAX = 0xffff
export const eS16_MIN = -32768
export const eS16_MAX = 32767
export const eU8_MAX = 0xff
export const eS8_MIN = -128
export const eS8_MAX = 127
export const eF32_MAX = 3.402823466e+38
export const eF32_MIN = -eF32_MAX
export const eF32_INF = 1e30
export const eALMOST_ZERO = .00001

class XY<T>
{
    constructor(x: T, y: T) {
    }
}

class XYZ<T>
{
    constructor(x: T, y: T, z: T) {
    }
}

class XYZW<T>
{
    constructor(x: T, y: T, z: T, w: T) {
    }
}

export type FXY = XY<number>
export type FXYZ = XYZ<number>
export type FXYZW = XYZW<number>

export type IXY = XY<BigInt>
export type IXYZ = XYZ<BigInt>
export type IXYZW = XYZW<BigInt>


export class Rect implements RectAttr {

    constructor(
        readonly x = 0,
        readonly y = 0,
        readonly width = 0,
        readonly height = 0) {
    }
}
