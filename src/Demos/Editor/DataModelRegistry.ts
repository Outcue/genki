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

import { NodeDataModel } from './NodeData'

export type NodeDataCreator = () => NodeDataModel

export class RegistryItemCreator {
}

export class DataModelRegistry {

    private _categories = new Set<string>()
    private _registeredItemCreators = new Map<string, NodeDataCreator>()
    private _registeredModelsCategory = new Map<string, string>()

    create(modelName: string): NodeDataModel | null {
        const creator = this._registeredItemCreators.get(modelName)
        if (creator != undefined) {
            return creator()
        }

        return null
    }

    registerModel(
        creator: NodeDataCreator,
        category: string = "Nodes"): void {

        const exemplar = creator()
        const name = exemplar.name()

        if (this._registeredItemCreators.has(name)) {
            console.warn('Model already registered: ', name)
        } else {
            this._registeredItemCreators.set(name, creator)
            this._categories.add(category)
            this._registeredModelsCategory.set(name, category)
        }
    }
}

