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

import { ForeignObject, SVG } from '@svgdotjs/svg.js'

import { Identifiable } from '../../Types/Identifiable'
import {
    isState,
    StateArrayChange,
    StateArrayValue,
    StateValue
} from '../../Bindings/State'
import { TextView } from '../Text/Text'
import { HStackLayout } from '../Layout/Stack'
import { View } from '../View'


export class PickerView extends HStackLayout {

    constructor(
        selection: StateValue<string>,
        label: TextView,
        items: string[]) {

        super()

        this.addChild(label)
        this.addChild(new PickerMenuView(selection, items))
    }
}

export function Picker(
    selection: StateValue<string>,
    label: TextView,
    items: string[]): PickerView

export function Picker(
    selection: StateValue<string>,
    label: TextView,
    items: StateArrayValue<string>): PickerView

export function Picker(
    selection: StateValue<string>,
    label: TextView,
    items: any): PickerView {
    return new PickerView(selection, label, items)
}

export class PickerMenuView extends View<PickerMenuView> {

    private _foreignObject: ForeignObject
    private _menu: HTMLSelectElement
    private _selection: StateValue<string>
    private _items: string[]

    constructor(
        selection: StateValue<string>,
        items: string[])

    constructor(
        selection: StateValue<string>,
        items: StateArrayValue<string>)

    constructor(
        selection: StateValue<string>,
        items: any) {

        super(View.Context.foreignObject(0, 0))

        this._foreignObject = this.element as ForeignObject
        this._selection = selection

        const div = document.createElement('div')
        div.style.width = '100%'
        div.style.height = '100%'
        div.style.alignItems = 'left'
        div.style.display = 'flex'
        div.style.flexDirection = 'column'
        div.style.justifyContent = 'center'

        const dom = SVG(div)
        this._foreignObject.add(dom)

        this._menu = document.createElement('select')
        div.appendChild(this._menu)

        // this._menu.style.fontSize = '24'
        // this._menu.style.border = 'none'
        // this._menu.style.background = 'none'

        // TODO: How to set default height?
        this.frame({ height: 44 })
        this.layout.setFlexGrow(1.0)

        const marginLeft = 5
        const marginBottom = 5
        this._menu.style.marginLeft = marginLeft.toString()
        this._menu.style.marginBottom = marginBottom.toString()

        this._items = items

        if (isState(items)) {

            const observable = items as StateArrayValue<Identifiable>
            observable.observe((change: StateArrayChange<Identifiable>) => {

                var updateLayout = false

                if (change.addedCount) {
                    //const item = [change.added[0]]
                    updateLayout = true
                }

                if (change.removedCount) {
                    //const item = change.removed[0]
                    updateLayout = true
                }

                this._items = [...items]
                const selected = this._menu.selectedIndex

                while (this._menu.length) {
                    this._menu.remove(0)
                }

                this.populateMenu()

                if (selected < this._items.length) {
                    this._menu.selectedIndex = selected
                } else {
                    this._menu.selectedIndex = 0
                }

                if (updateLayout) {
                    View.Layout.invalidate()
                }
            })
        } else {
            //this._items = [...items]
        }

        this.populateMenu()

        this._menu.onchange = () => {
            this._selection.set(this._menu.value)
        }
    }

    private populateMenu() {
        let index = 0
        for (const item of this._items) {
            const option = document.createElement('option')
            option.text = item
            option.value = item
            this._menu.add(option, index++)
        }
    }
}

