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

import { ConnectionStyle, NodeStyle, NodeViewStyle } from './NodeStyle'

export class StyleCollection {

    private static _instance: StyleCollection

    private _connectionStyle?: ConnectionStyle
    private _nodeStyle?: NodeStyle
    private _nodeViewStyle?: NodeViewStyle


    static get instance() {
        return this._instance || (this._instance = new this());
    }

    private constructor() {
    }

    static get nodeStyle(): NodeStyle {
        return StyleCollection.instance._nodeStyle;
    }

    static set nodeStyle(style: NodeStyle) {
        StyleCollection.instance._nodeStyle = style;
    }

    static get connectionStyle() {
        return StyleCollection.instance._connectionStyle;
    }

    static set connectionStyle(style: ConnectionStyle) {
        StyleCollection.instance._connectionStyle = style;
    }

    static get nodeViewStyle() {
        return StyleCollection.instance._nodeViewStyle;
    }


    static set nodeViewStyle(style: NodeViewStyle) {
        StyleCollection.instance._nodeViewStyle = style;
    }
}