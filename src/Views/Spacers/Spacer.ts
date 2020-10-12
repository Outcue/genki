
import { ProxyView } from '../View'

export class SpacerItem extends ProxyView {

    constructor() {
        super()
        this.layout.setFlexGrow(1.0)
        this.layout.setFlexShrink(1.0)
    }
}

export function Spacer(): SpacerItem {
    return new SpacerItem()
}

