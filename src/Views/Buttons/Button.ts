
import { Rect as RectSvg, Svg, Text as TextSvg } from '@svgdotjs/svg.js'

import { Color } from '../../Types/Color';
import { Font } from "../../Types/Font"
import { FrameData, FrameDataDefaults } from '../../Types/Types'

import { View } from '../View';

type ButtonAction = (button: View<ButtonView>) => void

export class ButtonView extends View<ButtonView> {

    protected readonly _group: Svg
    protected readonly _label: TextSvg
    protected readonly _box: RectSvg

    private _font: Font
    private _margin = 10.0

    constructor(title: string, action: ButtonAction)
    constructor(
        title: string,
        action: ButtonAction) {

        super(View.Context.group())

        this._group = this.element as Svg

        this._box = this._group.rect()
        this._box.opacity(0.0)
        this.addElement(this._box)

        this._label = this._group.text(title)
        this._label.attr({
            'pointer-events': 'none',
            'text-anchor': 'middle',
            'dominant-baseline': 'middle',
            'style': 'user-select: none; \
                    -webkit-touch-callout: none; \
                    -webkit-user-select: none; \
                    -khtml-user-select: none; \
                    -moz-user-select: none; \
                    -ms-user-select: none; \
                    user-select: none;'
        })

        this.setCursor()

        // Initial size is fit-to-text
        const textBox = this._label.bbox()
        this.frame({
            width: textBox.width + this._margin,
            height: textBox.height + this._margin
        })

        this.font(Font.system())

        // TODO: Accessibility
        //aria-labelledby="title">
        //<svg role="img" aria-label="[title + description]">
        //text.attr({ "role": "img", "aria-label": 'image label' })

        this._group.mousedown(() => {
            if (this._disabled) {
                return
            }
            action(this)
        })
    }

    public cornerRadius(radius: number) {
        this._box.radius(radius)
        return this
    }

    public frame({ width, height, minWidth, minHeight, maxWidth, maxHeight }
        : FrameData = FrameDataDefaults): ButtonView {
        super.frame({ width, height, minWidth, minHeight, maxWidth, maxHeight })
        this.centerText()
        return this
    }

    public font(inFont: Font): ButtonView {
        this._font = inFont

        this._label.font({
            family: this._font.family(),
            style: this._font.italic ? 'italic' : 'normal',
            size: this._font.size,
            weight: this._font.weight,
            anchor: 'middle'
        })

        // Initial size is fit-to-text
        const textBox = this._label.bbox()
        this.frame({
            width: textBox.width,
            height: textBox.height
        })
        return this
    }

    // MARK: Setters

    protected setBackgroundColor(color: Color) {

        const attrs = {
            fill: color.toString(),
            opacity: color.a
        }

        if (this.animationsEnabled()) {
            this.addAnimation(this._box, attrs)
        } else {
            this._box.attr(attrs)
        }
    }

    protected setForegroundColor(color: Color) {

        const attrs = {
            fill: color.toString(),
            opacity: color.a
        }

        if (this.animationsEnabled()) {
            this.addAnimation(this._label, attrs)
        } else {
            this._label.attr(attrs)
        }
    }

    public setDisabled(isDisabled: boolean) {
        super.setDisabled(isDisabled)
        this.setCursor()
    }

    private setCursor() {

        const cursor = this._disabled ? 'default' : 'pointer'

        this._group.attr({
            cursor: cursor
        })

        this._box.opacity(0.0)
        this._box.attr({
            cursor: cursor
        })
        this.addElement(this._box)

        this._label.attr({
            cursor: cursor
        })
    }

    protected setShadow(
        color: Color,
        radius: number,
        x: number,
        y: number) {
        super.setShadow(color, radius, x, y)
    }

    protected updateBorder() {

        const attrs = {
            'stroke': this._borderColor.toString(),
            'stroke-width': this._borderWidth,
            'opacity': this._borderColor.a
        }

        if (this.animationsEnabled()) {
            this.addAnimation(this._box, attrs)
        } else {
            this._box.attr(attrs)
        }
    }

    private centerText(): void {

        const width = this._box.width() as number
        const height = this._box.height() as number
        const textBox = this._label.bbox()
        const centerX = (width - textBox.width) / 2.0
        const centerY = (height - textBox.height) / 2.0

        this._label
            .x(centerX)
            .y(centerY)
    }
}

export function Button(label: string, action: ButtonAction): ButtonView {
    return new ButtonView(label, action)
}

