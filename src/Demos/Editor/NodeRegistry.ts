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

import { DataModelRegistry } from './DataModelRegistry'

const GroupAnimations = 'Animations'
const GroupOperators = 'Operators'
const GroupEffects = 'Effects'
const GroupFilters = 'Filters'
const GroupAssets = ' Items'
const GroupTransitions = 'Transitions'
const GroupValues = 'Values'

export class NodeRegistry {

    private static _instance: NodeRegistry

    static get instance() {
        return this._instance || (this._instance = new this());
    }

    private constructor() {
    }

    static registerDataModels(): DataModelRegistry {

        const registry = new DataModelRegistry()

        registry.registerModel(GroupAssets)

        return registry
    }
}