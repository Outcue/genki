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

import { Ellipse as EllipseSvg, Svg } from '@svgdotjs/svg.js'

import { Shape } from './Shape';
import { View } from '../Views/View';

export class EllipseShape extends Shape {

    protected readonly _Ellipse: EllipseSvg

    constructor() {
        super(View.Context.ellipse())
        this._Ellipse = this._shape as EllipseSvg
    }
}

export function Ellipse(): EllipseShape {
    return new EllipseShape()
}


