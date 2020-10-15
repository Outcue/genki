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

import Yoga from 'yoga-layout';

import { Layout } from './Layout'

import { Edge } from '../../Types/Types'
import { AnyView } from '../../Views/View'
import { SpacerItem } from '../../Views/Spacers/Spacer'


export const enum HorizontalAlignment {
    leading,
    center,
    trailing
}

export const enum VerticalAlignment {
    top,
    center,
    bottom
}

const enum StackOrientation {
    Horizontal,
    Vertical,
    None
}

export class StackLayout extends Layout {

    constructor(readonly orientation: StackOrientation) {
        super()
    }

    addChild(child: AnyView) {
        super.addChild(child)
        this.updateSpacers()
    }

    removeChild(child: AnyView) {
        super.removeChild(child)
        this.updateSpacers()
    }

    public hasSpacer(): boolean {

        var result = false

        for (const child of this.children) {

            if (child instanceof SpacerItem) {
                result = true
                break
            }

            if (child instanceof StackLayout) {
                result = child.orientation != this.orientation
                    && child.hasSpacer()
                if (result) {
                    break
                }
            }
        }
        return result
    }

    public fillCrossAxis(): boolean {

        var result = false
        for (const child of this.children) {
            if (child instanceof StackLayout) {
                result = child.orientation != this.orientation
                    && child.hasSpacer()
                break
            }
        }
        return result
    }

    protected applySpacing(): void {

        if (this.orientation == StackOrientation.None) {
            return
        }

        // TOOD: Existing item padding must be preserved as well.
        const last = this.children.length
        if (last > 1) {
            const edge = this.orientation
                == StackOrientation.Horizontal ? Edge.leading : Edge.top
            for (var i = 1; i < last; i++) {
                let view = this.children[i]
                view.padding(edge, this._spacing)
            }
        }
    }

    private updateSpacers() {

        if (this.hasSpacer()) {

            switch (this.orientation) {
                case StackOrientation.Vertical:
                    this.layout.setHeightPercent(100)
                    break

                case StackOrientation.Horizontal:
                    this.layout.setWidthPercent(100)
                    break

                default:
                    break
            }

            if (this.fillCrossAxis()) {

                switch (this.orientation) {
                    case StackOrientation.Vertical:
                        this.layout.setWidthPercent(100)
                        break

                    case StackOrientation.Horizontal:
                        this.layout.setHeightPercent(100)
                        break

                    default:
                        break
                }
            }
        }
    }
}

// MARK: ZStack

export class ZStackLayout extends StackLayout {
    constructor() {
        super(StackOrientation.None)
        this.group.data('layout', 'ZStack')
        this.layout.setFlexDirection(Yoga.FLEX_DIRECTION_ROW)
    }

    public addChild(child: AnyView) {
        super.addChild(child)
        child.layout.setPositionType(Yoga.POSITION_TYPE_ABSOLUTE)
    }

}

export function ZStack(...children: AnyView[]): ZStackLayout {
    const layout = new ZStackLayout()
    layout.addChildren(children)
    return layout
}

// MARK: HStack

export class HStackLayout extends StackLayout {

    private _alignment = VerticalAlignment.center

    constructor() {
        super(StackOrientation.Horizontal)
        this.group.data('layout', 'HStack')
        this.layout.setFlexDirection(Yoga.FLEX_DIRECTION_ROW)
    }

    alignment(alignment: VerticalAlignment): AnyView {

        if (alignment == this._alignment) {
            return
        }
        this._alignment = alignment
        return this
    }
}

export function HStack(...children: AnyView[]): HStackLayout {
    const layout = new HStackLayout()
    layout.addChildren(children)
    return layout
}

// MARK: VStack

export class VStackLayout extends StackLayout {
    constructor() {
        super(StackOrientation.Vertical)
        this.group.data('layout', 'VStack')
        this.layout.setFlexDirection(Yoga.FLEX_DIRECTION_COLUMN)
    }
}

export function VStack(...children: AnyView[]): VStackLayout {
    const layout = new VStackLayout()
    layout.addChildren(children)
    return layout
}

