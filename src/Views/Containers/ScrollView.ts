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

import { ForeignObject, SVG } from '@svgdotjs/svg.js'


import { Point, } from '../../Types/Point';
import { Layout } from '../Layout/Layout'
import { AnyView, View } from '../View'


export class ScrollViewView extends Layout {

    private _foreignObject: ForeignObject
    constructor() {

        super()

        this.group.data('layout', 'ScrollView')

        this._foreignObject = View.Context.foreignObject(0, 0)
        this._foreignObject.data('view', 'Scroll Container')

        const div = document.createElement('div')
        div.style.overflow = 'auto'
        const dom = SVG(div)
        this._foreignObject.add(dom)

        this.group.add(this._foreignObject)
        //this.addElement(this._foreignObject)
    }

    public addChild(child: AnyView) {
        super.addChild(child)
        this.updateScrollExtents()
    }

    protected applyLayout(origin: Point) {
        super.applyLayout(origin)
        this.updateScrollExtents()
    }

    private updateScrollExtents() {

        if (this.children.length) {

            const child = this.children[0]
            this.group.width(
                Math.max(
                    this.group.width() as number,
                    child.getWidth() as number))
            this.group.height(
                Math.max(
                    this.group.height() as number,
                    child.getHeight() as number))
        }
    }

}

export function ScrollView(...children: AnyView[]): ScrollViewView {
    const view = new ScrollViewView()
    view.addChildren(children)
    return view
}
