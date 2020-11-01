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

import { DataModelRegistry } from './DataModelRegistry'
import { NodeRegistry } from './NodeRegistry'
import { NodeScene } from './NodeScene'

var registry: DataModelRegistry
var scene: NodeScene

window.onresize = () => {
}

window.onload = () => {
    registry = NodeRegistry.registerDataModels()
    scene = new NodeScene(registry)
    const type = registry.create('ValueNode')
    if (type) {
        const node = scene.addNode(type)
    }
}



