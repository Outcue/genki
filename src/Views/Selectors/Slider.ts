
import { ForeignObject, SVG } from '@svgdotjs/svg.js'

import { Action } from '../../Types/Actions';
import { Color } from '../../Types/Color';
import { StateValue, State } from '../../Bindings/State';
import { View } from '../View';


// MARK: SliderData

interface SliderData {
    value?: StateValue<number>
    min?: number
    max?: number
    step?: number
    onEditingChanged?: Action<boolean>
    vertical?: boolean
}

const SliderDataDefaults: SliderData = {
    value: State(0.0),
    min: 0.0,
    max: 1.0,
    step: 0.1,
    onEditingChanged: null,
    vertical: false
}

export class SliderView extends View<SliderView> {

    private static DefaultHeight = 30.0

    private _foreignObject: ForeignObject
    private _slider: HTMLInputElement
    private _value: StateValue<number>
    private _onEditingChanged: Action<boolean>

    constructor({
        value,
        min,
        max,
        step,
        onEditingChanged,
        vertical
    }: SliderData) {

        super(View.Context.foreignObject(0, 0))

        this._value = value ?? SliderDataDefaults.value
        min = min ?? SliderDataDefaults.min
        max = max ?? SliderDataDefaults.max
        step = step ?? SliderDataDefaults.step
        this._onEditingChanged = onEditingChanged

        this._foreignObject = this.element as ForeignObject
        this.frame({ height: SliderView.DefaultHeight })

        const sliderId = this.id + '_slider'
        this._foreignObject.add(
            SVG(
                '<div>                                      \
                <input                                      \
                type = "range"                              \
                step = '+ step.toString() + '               \
                min = '+ min.toString() + '                 \
                max = '+ max.toString() + '                 \
                value = '+ value.get().toString() + '       \
                id = ' + sliderId + '                       \
                >                                           \
                </div>'
            )
        )

        this._slider = document.getElementById(sliderId) as HTMLInputElement
        this._slider.style.display = "block"
        this._slider.style.width = '100%'
        this._slider.style.height = '100%'
        const direction = vertical ? 'slider-vertical' : ''
        this._slider.style.webkitAppearance = direction

        this._slider.oninput = () => {
            this._value.set(+this._slider.value)
        }

        this._slider.onmousedown = () => {
            if (this._onEditingChanged) {
                this._onEditingChanged(true)
            }
        }

        this._slider.onmouseup = () => {
            if (this._onEditingChanged) {
                this._onEditingChanged(false)
            }
        }
    }

    protected setBackgroundColor(color: Color) {
        this._slider.setAttribute("background", color.toString())
    }

    protected setAccentColor(color: Color) {
        this._slider.setAttribute("background", color.toString())
    }

}

export function Slider({
    value, min, max, step, vertical, onEditingChanged }: SliderData): SliderView {
    return new SliderView({ value, min, max, step, vertical, onEditingChanged })
}

