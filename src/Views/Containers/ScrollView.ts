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

import { Element, ForeignObject, Svg, SVG } from '@svgdotjs/svg.js'


import { Point, } from '../../Types/Point';
import { AnyView, View } from '../View'


export class ScrollViewView extends View<ScrollViewView> {

    private _foreignObject: ForeignObject
    private _scroller: Element
    private _context: Svg

    constructor() {

        super(View.Context.foreignObject(0, 0))

        this._foreignObject = this.element as ForeignObject
        this._scroller = SVG(
            '<div style="overflow: auto;"/>'
        )
        this._foreignObject.add(this._scroller)
        this.addElement(this._scroller)

        this._context = View.Context.nested()
        this._scroller.add(this._context)
    }

    public addChild(child: AnyView) {
        super.addChild(child)
        this._context.add(child.element)
        this.updateScrollExtents()
    }

    protected applyLayout(origin: Point) {
        super.applyLayout(origin)
        this.updateScrollExtents()
    }

    private updateScrollExtents() {

        if (this.children.length) {

            const child = this.children[0]
            this._context.width(
                Math.max(
                    this._context.width() as number,
                    child.getWidth() as number))
            this._context.height(
                Math.max(
                    this._context.height() as number,
                    child.getHeight() as number))
        }
    }

}

export function ScrollView(...children: AnyView[]): ScrollViewView {
    const view = new ScrollViewView()
    view.addChildren(children)
    return view
}
