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

import { G } from '@svgdotjs/svg.js'
import Yoga from 'yoga-layout';

import { AnyView, View } from '../View'
import { BoolViewAction } from '../View'

export class Layout extends View<Layout> {

    public readonly group: G

    protected _spacing = 5.0

    constructor() {
        super(View.Context.rect())

        this.layout.setJustifyContent(Yoga.JUSTIFY_CENTER)
        this.layout.setAlignItems(Yoga.ALIGN_CENTER)
        this.layout.setAlignSelf(Yoga.ALIGN_CENTER)
        this.layout.setAlignContent(Yoga.ALIGN_CENTER)

        this.group = View.Context.group()
        this.group.data('layout', 'Layout')
        this.addElement(this.group)

        // Add the transparent background view
        this.element.attr({
            opacity: 0.0
        })
        this.element.data('layout', 'Layout Background')
        this.group.add(this.element)
    }

    public addChild(child: AnyView) {
        super.addChild(child)
        this.group.add(child.element)
        if (child instanceof Layout) {
            this.group.add(child.group)
        }

        // TODO: Just apply spacing to the inserted item
        this.applySpacing()
    }

    spacing(amount: number): Layout {

        if (amount == this._spacing) {
            return
        }
        this._spacing = amount
        this.applySpacing()
        return this
    }

    invalidate() {
        // TODO: Add an invalidation mechanism
        this.apply()
    }

    apply(
        width: number = window.innerWidth,
        height: number = window.innerHeight) {
        this.layout.calculateLayout(width, height)
        this.applyLayout()
    }

    // Overidden from view. The mouse events muse be 
    // handled by the group containing all children
    onHover(action: BoolViewAction): Layout {

        this.group.mouseover(() => {
            action(true, this)
        })

        this.group.mouseout(() => {
            action(false, this)
        })

        return this
    }

    protected applySpacing(): void {
        // Spacing must be added to each item as there is no concept of
        // overall spacing in yoga layout.
        // Derived classes may do something here.
    }
}

export class RootLayout extends Layout {
    constructor() {
        super()
        this.group.data('layout', 'RootLayout')
        this.layout.setWidthPercent(100)
        this.layout.setHeightPercent(100)
        this.layout.setFlexGrow(0.0)
        this.layout.setFlexShrink(0.0)
    }
}

