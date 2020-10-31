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

import { Shape } from '@svgdotjs/svg.js'
import '@svgdotjs/svg.draggable.js'

import { Node } from './Node'
import { NodeScene } from './NodeScene'
import { Rect } from './NodeTypes'

export class NodeGraphicsObject {

    private readonly shape?: Shape

    //private _locked = false
    //private _alternateFill = false

    constructor(
        private node: Node,
        private scene: NodeScene) {

        this.shape = this.scene.context.rect()
        this.shape.draggable()

        const nodeStyle = this.node.nodeDataModel.nodeStyle()
        this.setOpacity(nodeStyle.Opacity)
        this.setAcceptHoverEvents(true)
        this.setZValue(0)

        this.shape.attr({
            fill: nodeStyle.FillColor.toString(),
            opacity: nodeStyle.Opacity
        })

        const geom = this.node.nodeGeometry
        const bounds = geom.boundingRect()
        console.log(bounds)
        this.shape.x(bounds.x)
        this.shape.y(bounds.y)
        this.shape.width(bounds.width)
        this.shape.height(bounds.height)

        //this.scene.addItem(this)
    }

    collapse() {
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
    }

}