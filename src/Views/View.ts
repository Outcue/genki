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

import "@svgdotjs/svg.filter.js"

import { Dom, Element, Filter, Rect as RectSvg, Svg } from '@svgdotjs/svg.js'
import Yoga, { Node } from 'yoga-layout'

import {
    isState,
    State,
    StateChange,
    StateValue
} from '../Bindings/State'

import { VoidAction } from '../Types/Actions'
import { Color } from '../Types/Color'

import {
    Edge,
    EdgeInsets,
    FrameData, FrameDataDefaults,
    ScaleData,
    ShadowData, ShadowDataDefaults
} from '../Types/Types'

import { Identifiable } from "../Types/Identifiable"
import { Point, PointData, PointDataDefaults } from '../Types/Point'
import { Animation } from "../Modifiers/Animations"
import { Layout, RootLayout } from '../Views/Layout/Layout'

type VoidViewAction = (view: AnyView) => void
export type BoolViewAction = (value: boolean, view: AnyView) => void

// A view that can be added to a layout
export abstract class AnyView extends Identifiable {

    public readonly layout = Node.create()
    public readonly children = new Array<AnyView>()

    protected readonly _elements = Array<Dom>()

    protected _disabled = false
    protected _animate = false

    protected _x = State<number>(0.0)
    protected _y = State<number>(0.0)
    protected _width = State<number>(0.0)
    protected _height = State<number>(0.0)

    protected appearAction: VoidAction
    protected disappearAction: VoidAction

    private readonly _intersector: IntersectionObserver

    private _animation = Animation.basic
    private _animations = new Map<Element, {}>()

    protected _shadowFilter: Filter

    private _parent: AnyView

    constructor(readonly element?: Element) {

        super()

        if (element) {
            element.attr({
                'id': this.id
            })

            const options = {
                root: document.documentElement
            }

            this._intersector = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.intersectionRatio > 0) {
                        if (this.appearAction) {
                            this.appearAction()
                        }
                    } else {
                        if (this.disappearAction) {
                            this.disappearAction()
                        }
                    }
                })
            }, options)

            this._intersector.observe(document.getElementById(this.id))
        }
    }

    public addChildren(children: AnyView[]) {

        for (var child of children) {
            if (child.isGroup()) {
                child.addedInternal(this)
                this.addChildren(child.children)
            } else {
                this.addChild(child)
            }
        }
    }

    public addChild(child: AnyView) {

        if (this.children.includes(child)) {
            console.error(child)
            throw new Error("Child already added to layout: ")
        }

        const count = this.layout.getChildCount()
        this.layout.insertChild(child.layout, count)
        this.children.push(child)
        child.addedInternal(this)
    }

    public removeChild(child: AnyView) {
        if (!this.children.includes(child)) {
            throw new Error("Not a child")
        }

        this.layout.removeChild(child.layout)
        const index = this.children.indexOf(child, 0)
        this.children.splice(index, 1)
    }

    private addedInternal(parent: AnyView) {
        this._parent = parent
        this.added()
    }

    public added() {
    }

    public removed() {
    }

    public removeSelf() {

        for (const child of this.children) {
            child.removeSelf()
            this.layout.removeChild(child.layout)
        }

        this.remove()
    }

    public remove() {

        if (this._parent) {
            this._parent.layout.removeChild(this.layout)
        }

        if (this._shadowFilter) {
            this._shadowFilter.remove()
        }

        if (this.element) {
            this.element.unfilter()
            this.element.remove()
        }

        for (var element of this._elements) {
            element.remove()
        }

        this.removed()
    }

    public getParent(): AnyView {
        return this._parent
    }

    // MARK: View Management

    // Elements are items whose dimensions mirror the dimensions
    // of the main element. They are not part of the child hierarchy.
    protected addElement(element: Dom) {
        this._elements.push(element)
    }

    public observeX(callback: (change: StateChange<number>) => void) {
        this._x.observe(callback)
    }

    public observeY(callback: (change: StateChange<number>) => void) {
        this._y.observe(callback)
    }

    public observeWidth(callback: (change: StateChange<number>) => void) {
        this._width.observe(callback)
    }

    public observeHeight(callback: (change: StateChange<number>) => void) {
        this._height.observe(callback)
    }

    public getWidth(): number {
        return this._width.get()
    }

    public getHeight(): number {
        return this._height.get()
    }

    // MARK: Animation

    public animationsEnabled(): boolean {
        return this._animate
    }

    public beginAnimation(animation: Animation) {
        if (this._animate) {
            throw new Error()
        }
        this._animate = true
        this._animation = animation
    }

    public addAnimation(element: Element, attributes: {}) {
        if (this._animations.has(element)) {
            // Merge element properties for animation
            const task = this._animations.get(element)
            const merged = Object.assign({}, task, attributes)
            this._animations.set(element, merged)
        } else {
            // Add element properties for animate
            this._animations.set(element, attributes)
        }
    }

    public commitAnimation() {
        this._animations.forEach((attributes: {}, element: Element) => {
            element.animate(
                this._animation.duration,
                this._animation.ease()
            ).attr(attributes)
        })
        this._animations.clear()
        this._animate = false
    }

    // MARK: Layout

    protected applyLayout(origin: Point = {
        x: 0.0,
        y: 0.0
    }, useComputed: boolean = true) {

        if (!this.element) {
            return
        }

        if (!this.element.visible()) {
            return
        }

        const computed = this.layout.getComputedLayout()
        var topLeft = Point(computed.left, computed.top)

        const position = Point(
            topLeft.x + origin.x,
            topLeft.y + origin.y
        )

        this.setPosition(position)

        if (useComputed) {
            this.setWidth(computed.width)
            this.setHeight(computed.height)
        }

        if (this instanceof Layout) {
            for (let child of this.children) {
                child.applyLayout(position)
            }
        } else {
            // Absolute placement of children at center of parent
            // when children are not part of a layout.
            for (let child of this.children) {

                const childW = child.getWidth() as number
                const childH = child.getHeight() as number

                const childX = (computed.width - childW) / 2.0
                const childY = (computed.height - childH) / 2.0

                const childPos = Point(
                    position.x + childX,
                    position.y + childY
                )

                child.setPosition(childPos)
                child.applyLayout(childPos, false)
            }
        }
    }

    abstract isGroup(): boolean
    abstract padding(type?: Set<Edge.Type>, amount?: number): void
    abstract setPosition({ x, y }: PointData): void
    abstract setWidth(width: number): void
    abstract setHeight(height: number): void
    abstract setDisabled(isDisabled: boolean): void
    abstract setHidden(isHidden: boolean): void
}

// A view that affects the layout but is not visible
export abstract class ProxyView extends AnyView {

    isGroup() { return false }
    padding(type?: Set<Edge.Type>, amount?: number): void { }
    setPosition({ x, y }: PointData): void { }

    setX(_: number) { }
    getX() { return this._x }
    setY(_: number) { }

    setWidth(_: number) { }
    setHeight(_: number) { }

    setDisabled(_: boolean) { }
    setHidden(_: boolean) { }
}

export interface EmptyView extends ProxyView {
}

/// A view with no effect on rendering.
class _EmptyViewImpl extends ProxyView {
}
export function EmptyView() {
    return new _EmptyViewImpl()
}

// A visible view that is contained by a layout
export class View<T> extends AnyView {

    static Context: Svg
    static Layout: RootLayout

    protected _borderColor = Color.clear
    protected _borderWidth = 1.0

    constructor(element: Element) {
        super(element)
    }

    public isGroup(): boolean {
        return false
    }

    // MARK: Modifiers
    public setPosition({ x, y }
        : PointData = PointDataDefaults): void {

        if (isState(x)) {
            x.observe((change: StateChange<number>) => {
                this.setX(change.newValue)
            })
        }

        if (isState(y)) {
            y.observe((change: StateChange<number>) => {
                this.setY(change.newValue)
            })
        }

        this.setX(x)
        this.setY(y)
    }

    public frame({ width, height, minWidth, minHeight, maxWidth, maxHeight }
        : FrameData = FrameDataDefaults): T {

        if (width) {

            this.layout.setWidth(Yoga.UNIT_POINT)

            if (isState(width)) {
                width.observe((change: StateChange<number>) => {
                    this.setWidth(change.newValue)
                })
                this.setWidth(width)
            } else {
                const value = this.getNumberValue(width)
                this.setWidth(value)
            }
        }

        if (height) {

            this.layout.setHeight(Yoga.UNIT_POINT)

            if (isState(height)) {
                height.observe((change: StateChange<number>) => {
                    this.setHeight(change.newValue)
                })
                this.setHeight(height)
            } else {
                const h = this.getNumberValue(height)
                this.setHeight(h)
            }
        }

        if (minWidth) {
            this.layout.setMinWidth(minWidth)
        }

        if (minHeight) {
            this.layout.setMinHeight(minHeight)
        }

        if (minHeight) {
            this.layout.setMinHeight(minHeight)
        }

        if (maxHeight) {
            this.layout.setMaxHeight(maxHeight)
        }

        return this as any
    }

    public background(color: StateValue<Color>): T
    public background(color: Color): T
    public background(color: any): T {

        if (isState(color)) {
            color.observe((change: StateChange<Color>) => {
                this.setBackgroundColor(change.newValue)
            })
            this.setBackgroundColor(color.get())
        } else if (Color.isRGBA(color)) {
            this.setBackgroundColor(Color(
                color.r,
                color.g,
                color.b,
                color.a))
        } else {
            this.setBackgroundColor(color)
        }

        return this as any
    }

    public accentColor(color: StateValue<Color>): T
    public accentColor(color: Color): T
    public accentColor(color: any): T {

        if (isState(color)) {
            color.observe((change: StateChange<Color>) => {
                this.setAccentColor(change.newValue)
            })
            this.setAccentColor(color)

        } else if (Color.isRGBA(color)) {
            this.setAccentColor(Color(
                color.r,
                color.g,
                color.b,
                color.a))
        } else {
            this.setAccentColor(color)
        }

        return this as any
    }

    public foregroundColor(color: StateValue<Color>): T
    public foregroundColor(color: Color): T
    public foregroundColor(color: any): T {

        if (isState(color)) {
            color.observe((change: StateChange<Color>) => {
                this.setForegroundColor(change.newValue)
            })
            this.setForegroundColor(color.get())
        } else if (Color.isRGBA(color)) {
            this.setForegroundColor(Color(
                color.r,
                color.g,
                color.b,
                color.a))
        } else {
            this.setForegroundColor(color)
        }

        return this as any
    }

    /** 
     * Adds a border to this view with the specified color and width.
    */

    public border(color: StateValue<Color>, lineWidth?: number): T
    public border(color: StateValue<Color>, lineWidth?: StateValue<number>): T
    public border(color: Color, lineWidth?: number): T
    public border(color: Color, lineWidth?: StateValue<number>): T
    public border(color: any, lineWidth?: any): T {

        if (isState(color)) {
            color.observe((change: StateChange<Color>) => {
                this._borderColor = change.newValue
                this.updateBorder()
            })
            this._borderColor = color.get()
        } else {
            this._borderColor = color
        }

        if (lineWidth) {
            if (isState(lineWidth)) {
                lineWidth.observe((change: StateChange<number>) => {
                    this._borderWidth = change.newValue
                    this.updateBorder()
                })
                this._borderWidth = lineWidth.get()
            } else {
                this._borderWidth = lineWidth
            }
        }

        this.updateBorder()

        return this as any
    }

    /**
     * Clips this view to its bounding frame, with the specified corner radius.
    */
    public cornerRadius(radius: number) {
        if (this.element instanceof RectSvg) {
            this.element.radius(radius)
        }
        return this as any
    }

    public opacity(amount: number): T {
        this.element.opacity(amount)
        return this as any
    }

    public shadow({ color, radius, x, y }
        : ShadowData = ShadowDataDefaults): T {

        if (!color) {
            color = ShadowDataDefaults.color
        }

        if (!radius) {
            radius = ShadowDataDefaults.radius
        }

        if (!x) {
            x = ShadowDataDefaults.x
        }

        if (!y) {
            y = ShadowDataDefaults.y
        }

        this.setShadow(color, radius, x, y)

        return this as any
    }

    public padding({ top, leading, bottom, trailing }: EdgeInsets, ignore?: number): T
    public padding(type?: Set<Edge.Type>, amount?: number): T
    public padding(type?: any, amount?: number): T {

        if (!type) {
            type = Edge.all
        }

        const pad = amount ?? 0.0

        if (type instanceof Set) {

            const edges = type ?? Edge.all

            switch (edges) {
                case Edge.top: {
                    this.layout.setMargin(Yoga.EDGE_TOP, pad)
                    break
                }

                case Edge.bottom: {
                    this.layout.setMargin(Yoga.EDGE_BOTTOM, pad)
                    break
                }

                case Edge.vertical: {
                    this.layout.setMargin(Yoga.EDGE_TOP, pad)
                    this.layout.setMargin(Yoga.EDGE_BOTTOM, pad)
                    break
                }

                case Edge.leading: {
                    this.layout.setMargin(Yoga.EDGE_LEFT, pad)
                    break
                }

                case Edge.trailing: {
                    this.layout.setMargin(Yoga.EDGE_RIGHT, pad)
                    break
                }

                case Edge.horizontal: {
                    break
                }

                case Edge.all: {
                    this.layout.setMargin(Yoga.EDGE_TOP, pad)
                    this.layout.setMargin(Yoga.EDGE_BOTTOM, pad)
                    this.layout.setMargin(Yoga.EDGE_LEFT, pad)
                    this.layout.setMargin(Yoga.EDGE_RIGHT, pad)
                    break
                }
            }
        } else {
            const insets = type as EdgeInsets
            this.layout.setMargin(Yoga.EDGE_TOP, insets.top ?? pad)
            this.layout.setMargin(Yoga.EDGE_BOTTOM, insets.bottom ?? pad)
            this.layout.setMargin(Yoga.EDGE_LEFT, insets.leading ?? pad)
            this.layout.setMargin(Yoga.EDGE_RIGHT, insets.trailing ?? pad)
        }
        return this as any
    }

    // Transforms
    public offset({ x, y }: PointData = PointDataDefaults): T {
        this.element.translate(x, y)
        return this as any
    }

    public rotate(degrees: number): T {
        this.element.rotate(degrees, 328, 135)
        return this as any
    }

    public scaledToFit(): T {
        return this as any
    }

    public scaleEffect({ amount, x, y }: ScaleData): T {

        if (amount != null) {
            this.element.transform({
                scale: amount
            })
        } else {
            this.element.transform({
                scaleX: x ?? 1.0,
                scaleY: y ?? 1.0
            })
        }
        return this as any
    }

    public hidden(isHidden: StateValue<boolean>): T
    public hidden(isHidden: boolean): T
    public hidden(isHidden: any): T {

        if (isState(isHidden)) {
            isHidden.observe((change: StateChange<boolean>) => {
                this.setHidden(!change.newValue)
            })
        }

        this.setHidden(isHidden)

        return this as any
    }

    public disabled(isDisabled: StateValue<boolean>): T
    public disabled(isDisabled: boolean): T
    public disabled(isDisabled: any): T {

        if (isState(isDisabled)) {
            isDisabled.observe((change: StateChange<boolean>) => {
                this.setDisabled(!change.newValue)
            })
        }

        this.setDisabled(isDisabled)

        return this as any
    }

    // Event handling
    public onTapGesture(count: number, action: VoidViewAction): T {

        if (this._disabled) {
            return this as any
        }

        this.element.click(() => {
            action(this)
        })

        return this as any
    }

    public onHover(action: BoolViewAction): T {

        if (this._disabled) {
            return this as any
        }

        this.element.mouseover(() => {
            action(true, this)
        })

        this.element.mouseout(() => {
            action(false, this)
        })

        return this as any
    }

    public onAppear(action: VoidAction): AnyView {
        this.appearAction = action
        return this
    }

    public onDisappear(action: VoidAction): AnyView {
        this.disappearAction = action
        return this
    }

    // MARK: Setters

    protected setForegroundColor(color: Color) {
    }

    protected setBackgroundColor(color: Color) {
        this.element.attr({
            fill: color.toString(),
            opacity: color.a
        })
    }

    protected setAccentColor(color: Color) {
        this.element.attr({
            fill: color.toString(),
            opacity: color.a
        })
    }

    protected updateBorder() {

        const attrs = {
            color: this._borderColor.toString(),
            width: this._borderWidth,
            opacity: this._borderColor.a
        }

        if (this.animationsEnabled()) {
            this.addAnimation(this.element, attrs)
        } else {
            this.element.attr(attrs)
        }
    }

    public setWidth(width: number) {

        if (this.layout.getWidth().unit == Yoga.UNIT_POINT) {
            this.layout.setWidth(width)
        }

        this.element.width(width)
        for (var element of this._elements) {
            element.node.setAttribute("width", width.toString())
            element.node.style.width = width.toString()
        }

        this._width.set(width)

        // TODO: Invalidate layout
    }

    public setHeight(height: number) {

        if (this.layout.getHeight().unit == Yoga.UNIT_POINT) {
            this.layout.setHeight(height)
        }

        this.element.height(height)
        for (var element of this._elements) {
            element.node.setAttribute("height", height.toString())
            element.node.style.height = height.toString()
        }

        this._height.set(height)

        // TODO: Invalidate layout
    }

    protected setX(x: number) {
        this.element.x(x)
        this._x.set(x)
        // Invalidate layout
    }

    protected setY(y: number) {
        this.element.y(y)
        this._y.set(y)
        // TODO: Invalidate layout
    }

    protected setShadow(
        color: Color,
        radius: number,
        x: number,
        y: number
    ) {

        if (this.element.attr('opacity') == 0.0) {
            this.element.attr('opacity', 1.0)
        }

        this.element.filterWith((add: Filter) => {
            const effect = add.flood(color.toString(), color.a)
                .composite(add.$source, 'in')
                .gaussianBlur(radius, radius)
                .offset(x, y)
            add.blend(add.$source, effect, null)
            this._shadowFilter = add
        })
    }

    public setDisabled(isDisabled: boolean): void {
        this._disabled = isDisabled
        for (const child of this.children) {
            child.setDisabled(isDisabled)
        }
    }

    public setHidden(isHidden: boolean): void {

        if (isHidden) {
            this.element.hide()
            for (const element of this._elements) {
                element.hide()
            }
        } else {
            this.element.show()
            for (const element of this._elements) {
                element.show()
            }
        }

        for (const child of this.children) {
            child.setHidden(isHidden)
        }

        View.Layout.invalidate()
    }

    // MARK: Utilities

    protected getNumberValue(value: any): number {
        var result = 0
        if (isState(value)) {
            result = value.get()
        } else if (typeof value === 'number') {
            result = value
        }
        return result
    }
}

export interface ViewBuilder {
    body(): AnyView
}
