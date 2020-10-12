
import { ForeignObject, SVG } from '@svgdotjs/svg.js'

import { StateValue } from '../../Bindings/State';
import { View } from '../View';


export class ToggleView extends View<ToggleView> {

    private _foreignObject: ForeignObject
    private _input: HTMLInputElement
    private _value: StateValue<boolean>

    constructor(label: string, value: StateValue<boolean>) {

        super(View.Context.foreignObject(0, 0))

        this._foreignObject = this.element as ForeignObject
        this._value = value

        const controlId = this.id + '_control'
        const checked = value.get() ? 'checked = ""' : ''

        this._foreignObject.add(
            SVG(
                '<div \
                    // style = "display: flex;\
                    //          flex-direction: column;\
                    //          align-items: center;"\
                             >\
                    <label>\
                        <input type = "checkbox"\
                        ' + checked + '\
                        id = ' + controlId + '\
                        >\
                        <span>\
                        '+ label + '\
                        </span>\
                    </label>\
                </div>'
            )
        )

        this._input = document.getElementById(controlId) as HTMLInputElement
        this._input.onclick = () => {
            this._value.set(this._input.checked)
        }

        // protected setBackgroundColor(color: Color) {
        //     this._input.setAttribute("background", color.toString())
        // }

        // protected setAccentColor(color: Color) {
        //     this._input.setAttribute("background", color.toString())
        // }

    }
}

export function Toggle(label: string, value: StateValue<boolean>): ToggleView {
    return new ToggleView(label, value)
}

