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

import { Filter, G, Point, Rect as RectSVG } from '@svgdotjs/svg.js'

import { Node } from './Node'
import { ConnectionPolicy } from './NodeData'
import { NodeScene } from './NodeScene'
import { PortType } from './PortType'
import { Rect } from './NodeTypes'
import { StyleCollection } from './StyleCollection'

const BlurRadius = 3.0
const Check = 32
const CheckH = Check / 2
const CornerRadius = 3.0
const LabelSize = 12
const Lightness = 115
const TitleSize = 12

export class NodeGraphicsObject {

    private readonly group: G
    private readonly shape: RectSVG
    private _shadowFilter?: Filter

    //private _locked = false
    //private _alternateFill = false

    constructor(

        private node: Node,
        private scene: NodeScene) {

        this.group = this.scene.context.group()
        this.group.draggable()

        this.shape = this.group.rect()

        const nodeStyle = this.node.nodeStyle()
        this.setOpacity(nodeStyle.Opacity)
        this.setAcceptHoverEvents(true)
        this.setZValue(0)

        // Create body
        this.shape.attr({
            fill: nodeStyle.FillColor.toString(),
            opacity: nodeStyle.Opacity
        })

        this.shape.radius(CornerRadius)

        this.shape.filterWith((add: Filter) => {
            const effect = add.flood(nodeStyle.ShadowColor.toString(), .33)
                .composite(add.$source, 'in')
                .gaussianBlur(BlurRadius, BlurRadius)
                .offset(2, 2)
            add.blend(add.$source, effect, "")
            this._shadowFilter = add
        })

        this.addConnectionPoints()

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
        return this.node.nodeGeometry.boundingRect(
        )
    }

    private static dotProduct(p1: Point, p2: Point) {
        return p1.x * p2.x + p1.y * p2.y
    }

    private addConnectionPoints() {

        const geom = this.node.nodeGeometry
        const state = this.node.nodeState
        const nodeStyle = this.node.nodeStyle()
        const connectionStyle = StyleCollection.connectionStyle

        const diameter = nodeStyle.ConnectionPointDiameter
        var reducedDiameter = diameter * 0.6

        for (const portType of [PortType.Out, PortType.In]) {

            const n = state.getEntries(portType).length

            for (var i = 0; i < n; ++i) {

                var p = geom.portScenePosition(i, portType)
                const dataType = this.node.dataType(portType, i)

                const entries = state.getEntries(portType)

                var canConnect = entries[i].size
                    || (portType == PortType.Out
                        && this.node.portOutConnectionPolicy(i) == ConnectionPolicy.Many)

                var r = 1.0

                if (state.isReacting()
                    && canConnect
                    && portType == state.reactingPortType()) {

                    var diff = new Point(
                        geom.draggingPos.x - p.x,
                        geom.draggingPos.y - p.y)

                    var dist = Math.sqrt(NodeGraphicsObject.dotProduct(diff, diff))
                    var typeConvertable = false

                    // {
                    //     if (portType == PortType.In) {
                    //         typeConvertable = scene.registry().getTypeConverter(state.reactingDataType(), dataType) != nullptr;
                    //     } else {
                    //         typeConvertable = scene.registry().getTypeConverter(dataType, state.reactingDataType()) != nullptr;
                    //     }
                    // }

                    if (state.reactingDataType().id == dataType.id || typeConvertable) {
                        const thres = 40.0;
                        r = (dist < thres) ? (2.0 - dist / thres) : 1.0
                    } else {
                        const thres = 80.0;
                        r = (dist < thres) ? (dist / thres) : 1.0
                    }
                }

                if (connectionStyle.useDataDefinedColors) {
                    //painter -> setBrush(connectionStyle.normalColor(dataType.id));
                } else {
                    //painter -> setBrush(nodeStyle.ConnectionPointColor);
                }

                const connection = this.group.circle(reducedDiameter * r)
                connection.x(p.x)
                connection.y(p.x)
            }
        }

        /*
        for (PortType portType: { PortType:: Out, PortType:: In }) {
            size_t n = state.getEntries(portType).size();
     
            for (unsigned int i = 0; i < n; ++i)
            {
                QPointF p = geom.portScenePosition(i, portType);
     
                const auto& dataType = model -> dataType(portType, i);
     
                bool canConnect = (state.getEntries(portType)[i].empty() ||
                    (portType == PortType:: Out &&
                        model -> portOutConnectionPolicy(i) == NodeDataModel:: ConnectionPolicy:: Many) );
     
                double r = 1.0;
                if (state.isReacting() && canConnect && portType == state.reactingPortType()) {
     
                    auto   diff = geom.draggingPos() - p;
                    double dist = std:: sqrt(QPointF:: dotProduct(diff, diff));
                    bool   typeConvertable = false;
     
                    {
                        if (portType == PortType:: In)
                        {
                            typeConvertable = scene.registry().getTypeConverter(state.reactingDataType(), dataType) != nullptr;
                        }
                    else {
                            typeConvertable = scene.registry().getTypeConverter(dataType, state.reactingDataType()) != nullptr;
                        }
                    }
     
                    if (state.reactingDataType().id == dataType.id || typeConvertable) {
                        const double thres = 40.0;
                        r = (dist < thres) ?
                            (2.0 - dist / thres) :
                            1.0;
                    }
                    else {
                        const double thres = 80.0;
                        r = (dist < thres) ?
                            (dist / thres) :
                            1.0;
                    }
                }
     
                if (connectionStyle.useDataDefinedColors()) {
                    painter -> setBrush(connectionStyle.normalColor(dataType.id));
                } else {
                    painter -> setBrush(nodeStyle.ConnectionPointColor);
                }
     
                painter -> drawEllipse(p,
                    reducedDiameter * r,
                    reducedDiameter * r);
            }
        }
        */
    }

    update() {
        const geom = this.node.nodeGeometry
        const bounds = geom.boundingRect()
        this.shape.x(bounds.x)
        this.shape.y(bounds.y)
        this.shape.width(bounds.width)
        this.shape.height(bounds.height)
    }
}