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

import { Color } from './Color';

export * from './Actions'
export * from './Angle'
export * from './Color'
export * from './Font'
export * from './Gradient'
export * from './Identifiable'
export * from './Point'
export * from './Rect'

// MARK: Edge

export namespace Edge {

    export const enum Type {
        bottom,
        leading,
        top,
        trailing
    }

    export const bottom = new Set<Type>([Type.bottom])
    export const leading = new Set<Type>([Type.leading])
    export const top = new Set<Type>([Type.top])
    export const trailing = new Set<Type>([Type.trailing])

    export const horizontal = new Set<Type>([
        Type.leading,
        Type.trailing])

    export const vertical = new Set<Type>([
        Type.top,
        Type.bottom])

    export const all = new Set<Type>([
        Type.leading,
        Type.trailing,
        Type.top,
        Type.bottom])
}

export interface EdgeData {
    amount?: number
    x?: number
    y?: number
}

export interface EdgeInsets {
    bottom?: number
    leading?: number
    top?: number
    trailing?: number
}

export const EdgeInsetsDefaults: EdgeInsets = {
    bottom: 0,
    leading: 0,
    top: 0,
    trailing: 0
}

// MARK: Frame

export interface FrameData {
    width?: any
    height?: any
    minWidth?: any
    minHeight?: any
    maxWidth?: any
    maxHeight?: any
}

export const FrameDataDefaults: FrameData = {
    width: 0,
    height: 0,
    minWidth: 0,
    minHeight: 0,
    maxWidth: 0,
    maxHeight: 0
}

// MARK: Lines

export const enum LineCap {
    // A line with a squared-off end. Extends to the endpoint of the Path.
    butt,
    // A line with a rounded end. Extends past the endpoint of the Path.
    round,
    // A line with a squared-off end. Extends past the endpoint of the Path.
    square
}

export const enum LineJoin {
    miter,
    /// A join with a rounded end. Extends past the endpoint of the Path.
    round,
    /// A join with a squared-off end. Extends past the endpoint of the Path.
    bevel
}

// MARK: Scale

export interface ScaleData {
    amount?: number
    x?: number
    y?: number
}

// MARK: Shadow

export interface ShadowData {
    color?: Color
    radius?: number
    x?: number
    y?: number
}

export const ShadowDataDefaults: ShadowData = {
    color: Color(0, 0, 0, 0.33),
    radius: 0.0,
    x: 0.0,
    y: 0.0,
}

// MARK: UnitPoint

export class UnitPoint {

    constructor(
        public x = 0.0,
        public y = 0.0) {
    }
}

export namespace UnitPoint {

    export const zero = new UnitPoint()
    export const center = new UnitPoint(0.5, 0.5)
    export const leading = new UnitPoint(0, 0.5)
    export const trailing = new UnitPoint(1, 0.5)
    export const top = new UnitPoint(0.5, 1)
    export const bottom = new UnitPoint(0.5, 0)
    export const topLeading = new UnitPoint(0, 0)
    export const topTrailing = new UnitPoint(1, 0)
    export const bottomLeading = new UnitPoint(0, 1)
    export const bottomTrailing = new UnitPoint(1, 1)
}


