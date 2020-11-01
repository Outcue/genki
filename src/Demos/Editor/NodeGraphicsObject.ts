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

import '@svgdotjs/svg.draggable.js'
import "@svgdotjs/svg.filter.js"

import { Filter, Rect as RectSVG } from '@svgdotjs/svg.js'

import { Node } from './Node'
import { NodeScene } from './NodeScene'
import { Rect } from './NodeTypes'

const Radius = 3.0

export class NodeGraphicsObject {

    private readonly shape: RectSVG
    private _shadowFilter?: Filter

    //private _locked = false
    //private _alternateFill = false

    constructor(
        private node: Node,
        private scene: NodeScene) {

        this.shape = this.scene.context.rect()
        this.shape.draggable()

        const nodeStyle = this.node.nodeStyle()
        this.setOpacity(nodeStyle.Opacity)
        this.setAcceptHoverEvents(true)
        this.setZValue(0)

        this.shape.attr({
            fill: nodeStyle.FillColor.toString(),
            opacity: nodeStyle.Opacity
        })

        this.shape.radius(Radius)

        this.shape.filterWith((add: Filter) => {
            const effect = add.flood(nodeStyle.ShadowColor.toString(), .33)
                .composite(add.$source, 'in')
                .gaussianBlur(Radius, Radius)
                .offset(2, 2)
            add.blend(add.$source, effect, "")
            this._shadowFilter = add
        })

        this.update()

        //this.scene.addItem(this)
    }

    remove() {
        if (this._shadowFilter) {
            this._shadowFilter.remove()
        }

        if (this.shape) {
            this.shape.unfilter()
            this.shape.remove()
        }
    }

    collapse() {
        this.node.nodeGeometry.collapse()
        this.update()
    }

    setOpacity(value: number): void {
    }

    setAcceptHoverEvents(value: boolean): void {
    }

    setZValue(value: number): void {
    }

    boundingRect(): Rect {
        return this.node.nodeGeometry.boundingRect()
    }

    update() {
        const geom = this.node.nodeGeometry
        const bounds = geom.boundingRect()
        console.log(bounds)
        this.shape.x(bounds.x)
        this.shape.y(bounds.y)
        this.shape.width(bounds.width)
        this.shape.height(bounds.height)
    }
}