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

import { Shape as ShapeSvg } from '@svgdotjs/svg.js'
import "@svgdotjs/svg.filter.js"

import { Color } from '../Types/Color';

import { isState, StateChange, StateValue } from '../Bindings/State';

import { View } from '../Views/View';


export class Shape extends View<Shape> {

    protected readonly _shape: ShapeSvg

    private _strokeColor = Color.clear
    private _lineWidth = 1.0

    constructor(shape: ShapeSvg) {
        super(shape)
        this.element.data('view', 'Shape')
        this._shape = this.element as ShapeSvg
        this.layout.setWidthPercent(100)
        this.layout.setHeightPercent(100)
    }

    public fill(color: StateValue<Color>): Shape;
    public fill(color: Color): Shape;
    public fill(color: any): Shape {

        if (isState(color)) {
            console.log(color)
            color.observe((color: Color) => {
                this.setBackgroundColor(color)
            })
            this.setBackgroundColor(color.get())
        } else {
            this.setBackgroundColor(color)
        }

        return this
    }

    public stroke(color: StateValue<Color>, lineWidth?: number): Shape
    public stroke(color: StateValue<Color>, lineWidth?: StateValue<number>): Shape
    public stroke(color: Color, lineWidth?: number): Shape
    public stroke(color: Color, lineWidth?: StateValue<number>): Shape
    public stroke(color: any, lineWidth?: any): Shape {

        this._strokeColor = color

        if (isState(color)) {
            color.observe((change: StateChange<Color>) => {
                this._strokeColor = change.newValue
                this.updateStroke()
            })
            this.updateStroke()
        }

        if (lineWidth) {
            this._lineWidth = lineWidth
            if (isState(lineWidth)) {
                lineWidth.observe((change: StateChange<number>) => {
                    this._lineWidth = change.newValue
                    this.updateStroke()
                })
            }
        }

        this.updateStroke()

        return this
    }

    private updateStroke() {
        this._shape.stroke({
            color: this._strokeColor.toString(),
            opacity: this._strokeColor.a,
            width: this._lineWidth
        })
    }
}

