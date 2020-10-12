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

import { Gradient as GradientSvg } from '@svgdotjs/svg.js'

import { RectangleShape } from '../Shapes/Rectangle';
import { GradientType } from '../Types/Types'
import { View } from '../Views/View';

abstract class GradientView extends RectangleShape {

    protected _gradient: GradientSvg

    constructor(type: string) {
        super()
        this._gradient = View.Context.gradient(type)
    }
}

export class LinearGradientView extends GradientView {
    constructor(gradient: GradientType) {

        super('linear')

        this._gradient
            .from(gradient.endPoint.x, gradient.endPoint.y)
            .to(gradient.startPoint.x, gradient.startPoint.y)

        var index = 0
        const step = 1 / Math.max(1, gradient.colors.length - 1)
        for (const color of gradient.colors) {
            this._gradient.stop(index, color.toString())
            index += step
        }

        this._rect.fill(this._gradient)
    }
}

export function LinearGradient(gradient: GradientType): LinearGradientView {
    return new LinearGradientView(gradient)
}

export class RadialGradientView extends GradientView {
    constructor(gradient: GradientType) {

        super('radial')

        // this._gradient
        //     .from(gradient.endPoint.x, gradient.endPoint.y)
        //     .to(gradient.startPoint.x, gradient.startPoint.y)

        var index = 0
        const step = 1 / Math.max(1, gradient.colors.length - 1)
        for (const color of gradient.colors) {
            this._gradient.stop(index, color.toString())
            index += step
        }

        this._rect.fill(this._gradient)
    }
}

export function RadialGradient(gradient: GradientType): RadialGradientView {
    return new RadialGradientView(gradient)
}



