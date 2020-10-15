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

export interface AngleData {
    radians?: any
    degrees?: any
}

export interface Angle {
    radians: number
    degrees: number
}

class _Angle implements Angle {

    radians: number
    degrees: number

    constructor({ radians, degrees }: AngleData = {}) {

        this.radians = radians ?? 0.0
        this.degrees = degrees ?? 0.0

        if (radians) {
            this.degrees = this.radians * (180.0 / Math.PI)
        }

        if (degrees) {
            this.radians = this.degrees * (Math.PI / 180.0)
        }
    }
}

export function Angle({ radians, degrees }: AngleData) {
    return new _Angle({ radians, degrees })
}

// public static let zero: Angle = .radians(0)

//   public static func + (lhs: Self, rhs: Self) -> Self {
//     .radians(lhs.radians + rhs.radians)
// }

//   public static func += (lhs: inout Self, rhs: Self) {
//     // swiftlint:disable:next shorthand_operator
//     lhs = lhs + rhs
// }

//   public static func - (lhs: Self, rhs: Self) -> Self {
//     .radians(lhs.radians - rhs.radians)
// }

//   public static func -= (lhs: inout Self, rhs: Self) {
//     // swiftlint:disable:next shorthand_operator
//     lhs = lhs - rhs
// }
// }

// extension Angle: Hashable, Comparable {
//   public static func < (lhs: Self, rhs: Self) -> Bool {
//         lhs.radians < rhs.radians
//     }
// }
