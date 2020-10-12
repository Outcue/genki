
import { Element, ForeignObject, Svg, SVG } from '@svgdotjs/svg.js'
import Yoga from 'yoga-layout';

import { Edge } from '../../Types/Types'
import { Point } from '../../Types/Point'

import { VStackLayout } from '../Layout/Stack'
import { ListStyle, PlainListStyle } from '../../Styles/ListStyle'
import { AnyView, View } from '../../Views/View'


export class ListView extends View<ListView> {

    readonly listLayout = new VStackLayout()

    private _style = PlainListStyle()

    private _foreignObject: ForeignObject
    private _scroller: HTMLDivElement
    private _group: Svg

    constructor() {

        super(View.Context.foreignObject(0, 0))

        this.element.data('view', 'List')

        // Create the div container
        this._foreignObject = this.element as ForeignObject
        this._foreignObject.data('view', 'Scroll Container')

        this._scroller = document.createElement('div')
        this._scroller.style.overflow = 'auto'
        this._foreignObject.add(this._scroller)

        this._group = View.Context.nested()
        this._group.add(this.listLayout.group)
        this._group.data('view', 'Group')
        //this._scroller.add(this._group)

        // List items are always aligned to the top
        this.listLayout.layout.setJustifyContent(Yoga.JUSTIFY_FLEX_START)

        // Elements are items whose dimensions mirror the dimensions
        // of the main element. They are not part of the child hierarchy.
        //this.addElement(this._scroller)
    }

    public addChild(child: AnyView) {

        if (this.children.includes(child)) {
            throw new Error("Child already added to layout")
        }

        // List items are aligned to the left by default
        child.layout.setAlignSelf(Yoga.ALIGN_FLEX_START)
        child.element.attr({
            cursor: "pointer"
        })
        this.listLayout.addChild(child)
    }

    protected applyLayout(origin: Point, useComputed: boolean) {

        super.applyLayout(origin, useComputed)

        // The list layout is a root layout that is embedded into the group.
        // Thus, we need to apply the layout using the view dimensions.
        const w = this.getWidth() as number
        const h = this.getHeight() as number
        this.listLayout.apply(w, h)

        // Set the dimensions of the group to update scrollbars
        const groupW = this.listLayout.group.width() as number
        const sizeW = Math.max(groupW, w)
        // TODO: Why do we have to do this to get the hscroll to hide properly?
        const width = (Math.max(0, sizeW - 15)).toString()
        this._group.node.setAttribute("width", width)
        this._group.node.style.width = width

        const groupH = this.listLayout.group.height() as number
        const sizeH = Math.max(groupH, h)
        const height = sizeH.toString()
        this._group.node.setAttribute("height", height)
        this._group.node.style.height = height
        this.listLayout.setHeight(sizeH)
    }

    public listStyle(style: ListStyle): View<ListView> {
        this._style = style
        this.listLayout.background(this._style.background())

        var first = true
        for (var child of this.listLayout.children) {
            if (first) {
                child.padding(Edge.top, this._style.paddingTop())
                first = false
            } else {
                child.padding(Edge.top, this._style.spacing())
            }
            child.padding(Edge.leading, this._style.paddingLeading())
        }
        return this
    }
}

export function List(...children: AnyView[]): ListView {
    const list = new ListView()
    list.addChildren(children)
    return list
}

