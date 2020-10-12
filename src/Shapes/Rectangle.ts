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

import { Rect as RectSvg } from '@svgdotjs/svg.js'

import { Shape } from './Shape';
import { View } from '../Views/View';

export class CapsuleShape extends Shape {

    protected readonly _rect: RectSvg

    constructor() {
        super(View.Context.rect())
        this._rect = this._shape as RectSvg
        this.updateRadius()
    }

    public setHeight(height: number): void {
        super.setHeight(height)
        this.updateRadius()
    }

    private updateRadius(): void {
        const radius = this._rect.height() / 2.0
        this._rect.radius(radius, radius)
    }
}

export function Capsule(): CapsuleShape {
    return new CapsuleShape()
}

export class RectangleShape extends Shape {

    protected readonly _rect: RectSvg

    constructor() {
        super(View.Context.rect())
        this._rect = this._shape as RectSvg
    }
}

export function Rectangle(): RectangleShape {
    return new RectangleShape()
}


export class RoundedRectangleShape extends RectangleShape {

    constructor(cornerRadius: number) {
        super()
        this._rect.radius(cornerRadius, cornerRadius)
    }

}

export function RoundedRectangle(cornerRadius: number): RoundedRectangleShape {
    return new RoundedRectangleShape(cornerRadius)
}


