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

import { Point } from '@svgdotjs/svg.js'

import { NodeDataModel } from './NodeData'

class NodeGeometry {

    private _width: number
    private _height: number
    private _entryWidth: number
    private _inputPortWidth: number
    private _outputPortWidth: number
    private _entryHeight: number
    private _spacing: number

    private _hovered: boolean
    private _expanded: boolean

    private _nSources: number
    private _nSinks: number

    private _draggingPos: Point

    private _dataModel: NodeDataModel

    // private QFontMetrics _fontMetrics;
    // mutable QFontMetrics _boldFontMetrics;
}