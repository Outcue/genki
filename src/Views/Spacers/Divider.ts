
import { Rect as RectSvg, Svg } from '@svgdotjs/svg.js'

import { FrameData, FrameDataDefaults, } from '../../Types/Types'

import { View } from '../View';


export class DividerView extends View<DividerView> {

    // TODO: Detect orientation
    private static defaultColor = "#F0F0F0"

    protected readonly _group: Svg
    protected readonly _divider: RectSvg

    constructor() {

        super(View.Context.nested())

        this._group = this.element as Svg

        this._divider = this._group.rect()
        this._divider.attr({
            fill: DividerView.defaultColor
        })
        this.addElement(this._divider)
    }

    public frame({ width, height, minWidth, minHeight, maxWidth, maxHeight }
        : FrameData = FrameDataDefaults): DividerView {
        super.frame({ width, height, minWidth, minHeight, maxWidth, maxHeight })
        this.centerDivider()
        return this
    }

    private centerDivider(): void {

        const x = this.element.x() as number
        const y = this.element.y() as number
        const width = this.element.width() as number
        const height = this.element.height() as number

        const dividerBox = this._divider.bbox()
        const centerX = (width - dividerBox.width) / 2.0
        const centerY = (height - 1.0) / 2.0

        this._divider
            .x(x + centerX)
            .y(y + centerY)
    }
}

export function Divider(): DividerView {
    return new DividerView()
}

