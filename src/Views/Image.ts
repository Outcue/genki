
import { Image as ImageSvg } from '@svgdotjs/svg.js'

import { isState, StateChange, StateValue } from '../Bindings/State'

import { View } from './View';

export class ImageView extends View<ImageView> {

    private _image: ImageSvg

    constructor(url?: string)
    constructor(url?: StateValue<string>)
    constructor(url?: any) {
        super(View.Context.image())
        this._image = this.element as ImageSvg
        this._image.attr({
            preserveAspectRatio: "xMidYMid slice",
        })

        if (url) {
            if (isState(url)) {
                this.url(url.get())
                url.observe((change: StateChange<string>) => {
                    this.url(change.newValue);
                })
            } else {
                this.url(url)
            }
        }
    }

    url(url: string): View<ImageView> {
        this._image.load(url)
        return this
    }

    scaledToFit(): View<ImageView> {
        this._image.attr({
            preserveAspectRatio: "xMidYMid meet",
        })
        return this
    }

}

export function Image(url?: string): ImageView
export function Image(url?: StateValue<string>): ImageView
export function Image(url?: any): ImageView {
    return new ImageView(url)
}

