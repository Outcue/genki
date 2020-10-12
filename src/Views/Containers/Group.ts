
import { AnyView, View } from '../View'

export class GroupView extends View<GroupView> {

    constructor() {
        super(View.Context.nested())
    }

    public isGroup(): boolean {
        return true
    }

    public addChild(child: AnyView) {
        this.children.push(child)
        this.element.add(child.element)
    }
}

export function Group(...children: AnyView[]): GroupView {
    const group = new GroupView()
    group.addChildren(children)
    return group
}

