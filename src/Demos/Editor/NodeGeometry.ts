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

import { Point, Rect } from '@svgdotjs/svg.js'

import { NodeDataModel, NodeValidationState } from './NodeData'
import { PortType } from './PortType'
import { StyleCollection } from './StyleCollection'

const vPad = 8.0
const vPad2X = vPad * 2
const NodeMinWidth = 100

class FontMetrics {
    width(value: string): number {
        return 0
    }

    height(): number {
        return 0
    }

    boundingRect(value: string): Rect {
        return new Rect()
    }
}

export class NodeGeometry {

    private _width = 100
    private _height = 150
    private _entryWidth = 20
    private _entryHeight = 80
    private _inputPortWidth = 70
    private _outputPortWidth = 70
    private _spacing = 10

    private _hovered = false
    private _expanded = true

    private _draggingPos = new Point(-1000, -1000)

    private _nSources: number
    private _nSinks: number

    private _fontMetrics = new FontMetrics()
    private _boldFontMetrics = new FontMetrics()

    constructor(private _dataModel: NodeDataModel) {
        this._nSources = this._dataModel.nPorts(PortType.Out)
        this._nSinks = this._dataModel.nPorts(PortType.In)
    }

    boundingRect(): Rect {

        const nodeStyle = StyleCollection.nodeStyle
        const hPad = 2.0 * nodeStyle.ConnectionPointDiameter

        return new Rect({
            x: 0 - hPad,
            y: 0 - vPad,
            width: this._width + 2 * hPad,
            height: this._height + vPad2X
        })
    }

    public recalculateSize() {

        this._entryHeight = this._fontMetrics.height()

        const maxNumOfEntries = Math.max(this._nSinks, this._nSources)
        const step = this._entryHeight + this._spacing
        this._height = step * maxNumOfEntries

        this._height += this.captionHeight()
        this._width = this._inputPortWidth + this._outputPortWidth + 2 * this._spacing

        this._width = Math.max(this._width, this.captionWidth())
        this._width = Math.max(NodeMinWidth, this._width)

        this._inputPortWidth = this.portWidth(PortType.In)
        this._outputPortWidth = this.portWidth(PortType.Out)

        if (this._dataModel.validationState() != NodeValidationState.Valid) {
            this._width = Math.max(this._width, this.validationWidth())
            if (this._expanded) {
                this._height += this.validationHeight() + this._spacing
            }
        }
    }

    private captionHeight(): number {
        if (!this._dataModel.captionVisible()) {
            return 0
        }

        const name = this._dataModel.caption()
        return this._boldFontMetrics.boundingRect(name).height()
    }

    private captionWidth(): number {
        if (!this._dataModel.captionVisible()) {
            return 0
        }

        const name = this._dataModel.caption()
        const bounds = this._boldFontMetrics.boundingRect(name)
        return bounds.width()
    }


    private portWidth(portType: PortType): number {

        var width = 0

        const ports = this._dataModel.nPorts(portType)

        for (var i = 0; i < ports; ++i) {

            var name = ""
            if (this._dataModel.portCaptionVisible(portType, i)) {
                name = this._dataModel.portCaption(portType, i)
            } else {
                name = this._dataModel.dataType(portType, i).name
            }
            width = Math.max(this._fontMetrics.width(name), width)
        }

        return width
    }

    private validationHeight(): number {
        const msg = this._dataModel.validationMessage()
        return this._boldFontMetrics.boundingRect(msg).height()
    }

    private validationWidth(): number {
        const msg = this._dataModel.validationMessage()
        return this._boldFontMetrics.boundingRect(msg).width()
    }
}
