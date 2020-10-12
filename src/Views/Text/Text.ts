
import "@svgdotjs/svg.filter.js"

import { ForeignObject, Svg, SVG, Rect as RectSvg, Text as TextSvg } from '@svgdotjs/svg.js'

import { isState, State, StateChange, StateValue } from '../../Bindings/State';

import { Action } from '../../Types/Actions'
import { Color } from '../../Types/Color'
import { FrameData, FrameDataDefaults, } from '../../Types/Types'
import { Font } from "../../Types/Font"
import { View } from '../View'

export class TextInfo {
    codepoint: number
    modifiers: number
}

export class TextView extends View<TextView> {

    private readonly _group: Svg
    private readonly _text: TextSvg
    private readonly _box: RectSvg

    private _font: Font
    private _underline = false
    private _linethrough = false
    private _color = Color.black

    constructor(text: StateValue<string>)
    constructor(text: string)
    constructor(text: any) {

        super(View.Context.nested())

        this._group = this.element as Svg

        this._box = this._group.rect()
        this._box.opacity(0.0)
        this.addElement(this._box)

        if (isState(text)) {
            this._text = this._group.text(text.get())
            text.observe((change: StateChange<string>) => {
                this._text.text(change.newValue)
                this.measureAndUpdate()
            })
        } else {
            this._text = this._group.text(text)
        }
        this.addElement(this._text)

        this._text.attr({
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

        // Initial size is fit-to-text
        const textBox = this._text.bbox()
        this.frame({
            width: textBox.width,
            height: textBox.height
        })

        this.foregroundColor(Color.text)
        this.font(Font.system())
        this.measureAndUpdate()
    }

    public rotate(degrees: number): TextView {
        this._text.rotate(degrees)
        return this
    }

    protected setForegroundColor(color: Color) {
        this.element.fill(color.toString())
    }

    protected setBackgroundColor(color: Color) {
        this.element.filterWith(function (add) {
            const flood = add.flood(color.toString(), color.a)
            add.composite(add.$source, flood, null)
        })
    }

    public font(inFont: Font): TextView {
        this._font = inFont
        this._text.font({
            family: this._font.family(),
            style: this._font.italic ? 'italic' : 'normal',
            size: this._font.size,
            weight: this._font.weight,
            anchor: 'middle'
        })

        // Initial size is fit-to-text
        const textBox = this._text.bbox()
        this.frame({
            width: textBox.width,
            height: textBox.height
        })
        return this
    }

    public fontWeight(weight: Font.Weight): TextView {
        this._font.weight = weight
        return this.font(this._font)
    }

    public bold(): TextView {
        this._font.bold = true
        return this.fontWeight(Font.Weight.bold)
    }

    public italic(): TextView {
        this._font.italic = true
        return this
    }

    public strikethrough(active: StateValue<boolean>, color?: Color): TextView
    public strikethrough(active: StateValue<boolean>, color?: StateValue<Color>): TextView
    public strikethrough(active: boolean, color?: Color): TextView
    public strikethrough(active: boolean, color?: StateValue<Color>): TextView
    public strikethrough(active: any, color?: any): TextView {


        if (isState(active)) {
            active.observe((change: StateChange<boolean>) => {
                this._linethrough = change.newValue
                this.updateLinethrough()
            })
            this._linethrough = active.get()
        } else {
            this._linethrough = active
        }

        if (color) {
            if (isState(color)) {
                color.observe((change: StateChange<Color>) => {
                    this._color = change.newValue
                    this.updateLinethrough()
                })
                this._color = color.get()
            } else {
                this._color = color
            }
        }

        this.updateLinethrough()

        return this
    }

    public underline(active: boolean, color?: Color): TextView {
        this._underline = active
        if (this._underline) {
            let decoration = 'underline'
            if (this._linethrough) {
                decoration += ' line-through'
            }
            this._text.attr({
                'text-decoration': decoration
            })

            if (color) {
                this.foregroundColor(color)

                // TODO: How to set color?
                // this._text.attr({
                //     'text-decoration-color': color.toString()
                // })
            }

        }
        return this
    }

    public frame({ width, height, minWidth, minHeight, maxWidth, maxHeight }
        : FrameData = FrameDataDefaults): TextView {
        super.frame({ width, height, minWidth, minHeight, maxWidth, maxHeight })
        this.measureAndUpdate()
        return this
    }

    private measureAndUpdate(): void {

        const box = this._box
        const width = box.width() as number
        const height = box.height() as number
        const textBox = this._text.bbox()
        // Center the text in the parent box
        // TODO: What about other alignments?
        const x = (width - textBox.width) / 2.0
        const y = (height - textBox.height) / 2.0

        this._text
            .x(x)
            .y(y)
    }

    private updateLinethrough() {

        var decoration = ""

        if (this._linethrough) {
            decoration = 'line-through'
            if (this._underline) {
                decoration += ' underline'
            }
        }

        this._text.attr({
            'text-decoration': decoration
        })
        this.foregroundColor(this._color)

    }
}

export function Text(text: StateValue<string>): TextView
export function Text(text: string): TextView
export function Text(text: any): TextView {
    return new TextView(text)
}

// MARK: TextField

export interface TextFieldData {
    text: StateValue<string>
    placeholder: string
    onEditingChanged?: Action<boolean>
    onCommit?: Action<void>
}

export const TextFieldDataDefaults: TextFieldData = {
    text: State(""),
    placeholder: "",
    onEditingChanged: null,
    onCommit: null
}

export interface TextFieldStyle {
}

export class DefaultTextFieldStyle implements TextFieldStyle {
}

export class PlainTextFieldStyle implements TextFieldStyle {

}

export class RoundedBorderTextFieldStyle implements TextFieldStyle {
}

export class SquareBorderTextFieldStyle implements TextFieldStyle {

}

export class TextFieldView extends View<TextFieldView> {

    private _foreignObject: ForeignObject
    private _font: Font
    private _input: HTMLInputElement
    private _text: StateValue<string>

    constructor(private isSecure: boolean, {
        text,
        placeholder,
        onEditingChanged,
        onCommit
    }: TextFieldData) {

        super(View.Context.foreignObject(0, 0))

        this._text = text

        this._foreignObject = this.element as ForeignObject

        const div = document.createElement('div')
        const dom = SVG(div)
        this._foreignObject.add(dom)

        this._input = document.createElement('input');
        this._input.placeholder = placeholder
        this._input.type = this.isSecure ? 'password' : 'text'
        this._input.style.border = 'none'
        this._input.style.outline = 'none'
        this._input.style.width = '100%'
        this._input.style.height = '100%'
        div.appendChild(this._input)

        this._input.oninput = () => {
            this._text.set(this._input.value)
            if (onEditingChanged) {
                onEditingChanged(true)
            }
        }

        this._input.onkeydown = (event: KeyboardEvent) => {
            if (event.key == 'Enter') {
                onCommit()
            }
        }

        if (isState(text)) {
            text.observe((change: StateChange<string>) => {
                this._input.value = change.newValue
            })
        }

        // TODO: How to set default height?
        this.frame({ height: 20 })
        this.layout.setFlexGrow(1.0)
    }

    public focus(hasFocus: boolean): TextFieldView
    public focus(hasFocus: StateValue<boolean>): TextFieldView
    public focus(hasFocus: any): TextFieldView {
        if (isState(hasFocus)) {
            hasFocus.observe((change: StateChange<boolean>) => {
                // TODO: Why do we have to use a timeout to make this work?
                setTimeout(() => this.setFocus(change.newValue), 0);
            })
        }
        // TODO: Why do we have to use a timeout to make this work?
        setTimeout(() => this.setFocus(hasFocus), 0);
        return this
    }

    private setFocus(hasFocus: boolean) {
        if (hasFocus) {
            this._input.focus()
        } else {
            this._input.blur()
        }
    }

    public font(inFont: Font): TextFieldView {
        this._font = inFont
        this._input.style.fontFamily = this._font.family()
        this._input.style.fontStyle = this._font.italic ? 'italic' : 'normal'
        this._input.style.fontSize = this._font.size.toString()
        this._input.style.fontWeight = this._font.weight.toString()
        return this
    }

    public textFieldStyle(style: TextFieldStyle) {
    }
}

export function TextField({
    text, placeholder, onEditingChanged, onCommit }
    : TextFieldData = TextFieldDataDefaults): TextFieldView {
    return new TextFieldView(false, {
        text,
        placeholder,
        onEditingChanged,
        onCommit
    })
}


export class SecureTextFieldView extends TextFieldView {

    constructor({ text, placeholder, onEditingChanged, onCommit }) {
        super(true, { text, placeholder, onEditingChanged, onCommit })
    }
}

export function SecureTextField({
    text, placeholder, onEditingChanged, onCommit }
    : TextFieldData = TextFieldDataDefaults): SecureTextFieldView {
    return new SecureTextFieldView({
        text,
        placeholder,
        onEditingChanged,
        onCommit
    })
}

