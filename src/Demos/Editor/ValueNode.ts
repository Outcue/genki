// Copyright 2020-present Genki contributors
//
// Licensed under the Apache License, Version 2.0 (the "License'
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

import { Color } from '@svgdotjs/svg.js'

import * as Type from './NodeTypes'

import { Node } from './Node'
import { NodeClass } from './NodeData'
import { NodeKeys } from './NodeKeys'

export class ValueBaseNode extends Node {

    constructor() {
        super()
        this.nodeStyle().FillColor = new Color(63, 89, 85, 255, 'rgb')
    }
}


export class ValueNode extends ValueBaseNode {

    static readonly Name = "Value"

    private static DefaultValue = 1.0;

    constructor() {
        super()

        this._name = ValueNode.Name
        this._type = ValueNode.Name

        this.OutPort(NodeClass.Scalar, NodeKeys.Value);

        this.ParamFloat(NodeKeys.Value,
            -Type.F32_MAX,
            Type.F32_MAX,
            ValueNode.DefaultValue,
            false,
            NodeKeys.GroupNone)
    }
}
