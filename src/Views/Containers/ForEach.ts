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

import { Group, GroupView } from './Group'

import { isState, StateArrayValue, StateArrayChange } from '../../Bindings/State'
import { AnyView, View } from '../View'
import { Identifiable } from 'Types/Identifiable'

type CreateViewAction = (value: Identifiable) => AnyView

export function ForEach(
    items: Array<Identifiable>,
    action: CreateViewAction): GroupView

export function ForEach(
    items: StateArrayValue<Identifiable>,
    action: CreateViewAction): GroupView

export function ForEach(
    items: Array<Identifiable> | StateArrayValue<Identifiable>,
    action: CreateViewAction): GroupView {

    const group = Group()

    populate(items, group, action)

    if (isState(items)) {

        const observable = items as StateArrayValue<Identifiable>
        observable.observe((change: StateArrayChange<Identifiable>) => {

            var updateLayout = false

            if (change.addedCount) {
                const item = [change.added[0]]
                populate(item, group, action)
                const child = group.children[group.children.length - 1]
                const parent = group.getParent()
                parent.addChild(child)
                updateLayout = true
            }

            if (change.removedCount) {
                const todoItem = change.removed[0]
                for (const index in group.children) {
                    const child = group.children[index]
                    if (child.id === todoItem.id) {
                        child.removeSelf()
                        group.children.splice(+index, 1)
                        updateLayout = true
                        break
                    }
                }
            }

            if (updateLayout) {
                View.Layout.invalidate()
            }
        })
    }

    return group
}

function populate(
    items: Array<Identifiable>,
    group: GroupView,
    action: CreateViewAction) {
    for (const item of items) {
        const view = action(item)
        view.id = item.id
        group.addChild(view)
    }
}
