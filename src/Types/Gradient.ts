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

import { Color } from './Color'
import { UnitPoint } from './Types'

class GradientStop {

    readonly location: number

    constructor(
        readonly color: Color,
        location: number) {
        // Must be in the range 0 [0, 1]
        this.location = Math.min(Math.max(location, 0.0), 1.0)
    }
}

export interface GradientData {
    colors: Color[],
    radius?: number
    startPoint?: UnitPoint
    endPoint?: UnitPoint
    center?: UnitPoint
    startRadius?: number
    endRadius?: number
}

// export const GradientDataDefaults: GradientData = {
//     colors: [Color.black],
//     radius: 1.0,
//     startPoint: UnitPoint.top,
//     endPoint: UnitPoint.bottom,
//     center: UnitPoint.center,
//     startRadius: 0.0,
//     endRadius: 1.0
// }

export class GradientType {

    //private stops: GradientStop[]

    constructor(
        readonly colors: Color[],
        readonly startPoint: UnitPoint,
        readonly endPoint: UnitPoint) {
    }
}

export function Gradient(
    colors: Color[],
    start: UnitPoint,
    end: UnitPoint) {
    return new GradientType(colors, start, end)
}

export namespace Gradient {
    export type Stop = GradientStop
}