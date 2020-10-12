
import { Color } from '../Types/Color'

export interface ListStyle {

    hasDividers(): boolean
    background(): Color

    paddingLeading(): number
    paddingTrailing(): number
    paddingTop(): number
    paddingBottom(): number

    paddingLeading(): number
    paddingTrailing(): number
    paddingTop(): number
    paddingBottom(): number

    spacing(): number

}

class PlainListStyleImpl implements ListStyle {
    constructor() {
    }

    hasDividers(): boolean {
        return true
    }

    background(): Color {
        return Color.white
    }

    paddingLeading(): number {
        return 0.0
    }

    paddingTrailing(): number {
        return 0.0
    }

    paddingTop(): number {
        return 0.0
    }

    paddingBottom(): number {
        return 0.0
    }

    spacing(): number {
        return 0.0
    }
}

export function PlainListStyle(): PlainListStyleImpl {
    return new PlainListStyleImpl()
}

class SidebarListStyleImpl implements SidebarListStyleImpl {
    constructor() {
    }

    hasDividers(): boolean {
        return false
    }

    background(): Color {
        return Color.sidebar
    }

    paddingLeading(): number {
        return 25.0
    }

    paddingTrailing(): number {
        return 0.0
    }

    paddingTop(): number {
        return 15.0
    }

    paddingBottom(): number {
        return 0.0
    }

    spacing(): number {
        return 10.0
    }
}

export function SidebarListStyle(): SidebarListStyleImpl {
    return new SidebarListStyleImpl()
}

