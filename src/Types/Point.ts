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

import { Angle } from './Angle'

export interface PointData {
    x?: any
    y?: any
}

export const PointDataDefaults: PointData = {
    x: 0,
    y: 0
}

export interface Point {
    readonly x: number
    readonly y: number
}

class _Point implements Point {

    readonly x: number
    readonly y: number

    constructor({ x, y }: PointData = {}) {
        this.x = x ?? 0.0
        this.y = y ?? 0.0
    }

    rotate(angle: Angle, around: Point): Point {
        const cosAngle = Math.cos(angle.radians)
        const sinAngle = Math.sin(angle.radians)
        return Point(
            cosAngle * (this.x - around.x)
            - sinAngle * (this.y - around.y) + around.x,

            sinAngle * (this.x - around.x)
            + cosAngle * (this.y - around.y) + around.y
        )
    }
}

export function Point(x: number = 0.0, y: number = 0.0) {
    return new _Point({ x: x, y: y })
}

export class Extent extends _Point {

    constructor(inPoint: Point) {
        super({ x: inPoint.x, y: inPoint.y })
    }
}

