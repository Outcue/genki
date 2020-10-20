// Copyright 2020-present Genki contributors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { autorun } from 'mobx'
import { SVG } from '@svgdotjs/svg.js'

import { State, StateArray, StateValue } from '../../Bindings/State'

import { Color } from '../../Types/Color'
import { Edge } from '../../Types/Types'
import { Font } from '../../Types/Font'
import { VoidAction, BoolAction } from '../../Types/Actions'

import { RootLayout, HStack, VStack, ZStack } from '../../Views/Layout/Layouts'

import { Identifiable } from '../../Types/Identifiable'

import { AnyView, View, ViewBuilder } from '../../Views/View'
import { Button, ButtonView } from '../../Views/Buttons/Button'
import { Spacer } from '../../Views/Spacers/Spacers'
import { Image, ImageView } from '../../Views/Image'
import { Text, TextField } from '../../Views/Text/Text'

import { ForEach } from '../../Views/Containers/ForEach'

import { Rectangle } from '../../Shapes/Shapes'

import { Assets } from '../../assets'


// MARK: - Window callbacks

window.onresize = () => {
    View.Layout.invalidate()
}

window.onload = () => {

    layoutBegin()

    // Expand the body to the size of the root layout
    const body = new TodoBuilder().body()
    body.layout.setWidthPercent(100)
    body.layout.setHeightPercent(100)
    View.Layout.addChild(body)

    layoutEnd()
}

// MARK: - Layout

function layoutBegin() {

    // Create the SVG container is the parent of all items
    View.Context = SVG()
        .addTo('#genki_root')
        .size('100%', '100%')

    View.Layout = new RootLayout()
}

function layoutEnd() {
    View.Layout.invalidate()
}

const enum FilterType {
    All,
    Active,
    Completed
}
const currentFilter = State<FilterType>(FilterType.All)

const backgroundColor = Color(.96, .96, .96)
const footerColor = Color.gray
const itemCompleteColor = Color(.83, .83, .83)
const shadowColor = Color(.5, .5, .5, .2)
const titleColor = Color(0.910, 0.851, 0.851, 1.000)

const checkSize = { width: 40, height: 40 }
const footerButtonHeight = 25
const footerFont = Font.system(14, Font.Weight.ultralight)
const footerFrame = { width: 550, height: 40 }
const frame = { width: 550, height: 65 }
const inputFrame = { width: 475, height: 65 }


// MARK: - Todo 

class TodoItem extends Identifiable {
    completed = State<boolean>(false)
    constructor(readonly title: string) {
        super()
    }

    isComplete(): boolean {
        return this.completed.get()
    }
}

// Observable state
var todoItems = StateArray<TodoItem>()
var listVisible = State<boolean>(false)
var itemsLeft = State<string>("")

const Store = 'genki_todo_store'

autorun(() => {
    listVisible.set(todoItems.length > 0)
    var left = 0
    for (const item of todoItems) {
        if (!item.isComplete()) {
            ++left
        }
    }
    itemsLeft.set(left.toString() + ' items left')

    // const serializedItems = JSON.stringify(toJS(todoItems))
    // let itemStore = localStorage.getItem(Store)
    // if (itemStore) {
    //     Object.assign(itemStore, serializedItems)
    // } else {
    //     localStorage.setItem(Store, serializedItems);
    // }
})


class CheckMarkButtonView {

    private image = State<string>(Assets.Unchecked)
    private on = false

    readonly body: ImageView

    constructor(private action: BoolAction) {
        this.body = this.makeBody()
    }

    private makeBody(): ImageView {
        return Image(this.image)
            .frame(checkSize)
            .onTapGesture(1, () => {
                this.on = !this.on
                if (this.on) {
                    this.image.set(Assets.Checked)
                } else {
                    this.image.set(Assets.Unchecked)
                }
                this.action(this.on)
            })
    }
}

function CheckMarkButton(action: BoolAction) {
    return new CheckMarkButtonView(action).body
}

class TodoListItemView {

    readonly body: AnyView
    readonly textColor = State<Color>(Color.black)
    readonly closeHidden = State<boolean>(true)

    constructor(item: TodoItem) {
        this.body = this.makeBody(item)
    }

    private makeBody(item: TodoItem): AnyView {

        return VStack(

            HStack(

                CheckMarkButton((checked: boolean) => {
                    item.completed.set(checked)
                    if (checked) {
                        this.textColor.set(itemCompleteColor)
                    } else {
                        this.textColor.set(Color.black)
                    }
                }),

                Text(item.title)
                    .font(Font.system(24, Font.Weight.ultralight))
                    .strikethrough(item.completed, this.textColor)
                    .onTapGesture(1, () => {
                    }),

                Spacer(),

                Button('✕', () => {
                    todoItems.remove(item)
                })
                    .padding({ trailing: 20 })
                    .font(Font.system(34, Font.Weight.ultralight))
                    .foregroundColor(titleColor)
                    .hidden(this.closeHidden)
            )
                .frame(frame)
                .spacing(20),

            // Bottom horizontal line
            Rectangle()
                .background(backgroundColor)
                .frame({ width: frame.width, height: 1 })
        )
            .onHover((isHovering: boolean) => {
                this.closeHidden.set(isHovering)
            })
    }
}

function TodoListItem(item: TodoItem): AnyView {
    return new TodoListItemView(item).body
}

class InputFieldView {

    readonly body: AnyView
    private itemText = State<string>("")

    constructor(visible: StateValue<boolean>) {
        this.body = this.makeBody(visible)
    }

    private makeBody(visible: StateValue<boolean>): AnyView {

        return ZStack(

            VStack(

                HStack(
                    Button('╲╱', () => {
                    })
                        .font(Font.system(10, Font.Weight.bold))
                        .foregroundColor(Color.black)
                        .padding({ trailing: 15 }),

                    TextField({
                        text: this.itemText,
                        placeholder: "What needs to be done?",
                        onCommit: (): void => {
                            const trimmed = this.itemText.get().trim()
                            if (trimmed.length) {
                                const item = new TodoItem(trimmed)
                                todoItems.push(item)
                                this.itemText.set('')
                                visible.set(todoItems.length > 0)
                            }
                        }
                    })
                        .frame(inputFrame)
                        .font(Font.italic(24, Font.Weight.ultralight))
                        .focus(true)
                )
            )
        )
            .frame(frame)
            .background(Color.white)
            .shadow({
                color: shadowColor,
                radius: 3,
                x: 1,
                y: 3
            })
    }
}

function InputField(visible: StateValue<boolean>): AnyView {
    return new InputFieldView(visible).body
}

class FooterButtonView {

    readonly body: ButtonView

    private borderColor = State<Color>(Color.clear)
    private hoverColor: Color

    constructor(private title: string, private action: VoidAction) {
        this.body = this.makeBody()
        this.hoverColor = Color(
            titleColor.r,
            titleColor.g,
            titleColor.b,
            128)
    }

    private makeBody(): ButtonView {
        return Button(this.title, () => {
            this.action()
        })
            .font(footerFont)
            .border(this.borderColor)
            .background(Color.white)
            .cornerRadius(5.0)
            .onHover((isHovering: boolean) => {
                if (isHovering) {
                    this.borderColor.set(this.hoverColor)
                } else {
                    this.borderColor.set(Color.clear)
                }
            })
    }
}

function FooterButton(title: string, action: VoidAction) {
    return new FooterButtonView(title, action).body
}

class FooterView {

    readonly body: AnyView

    constructor(filter: StateValue<FilterType>) {
        this.body = this.makeBody(filter)
    }

    private makeBody(filter: StateValue<FilterType>) {

        return HStack(

            Text(itemsLeft)
                .font(footerFont)
                .padding({ leading: 20 }),

            Spacer(),

            HStack(
                FooterButton("All", () => {
                    filter.set(FilterType.All)
                })
                    .frame({ width: 30, height: footerButtonHeight }),

                FooterButton("Active", () => {
                    filter.set(FilterType.Active)
                })
                    .frame({ width: 60, height: footerButtonHeight }),

                FooterButton("Completed", () => {
                    filter.set(FilterType.Completed)
                })
                    .frame({ width: 80, height: footerButtonHeight }),

            )
                .spacing(10)
                .padding({ leading: 5 }),

            Spacer(),

            FooterButton("Clear Completed", () => {
            })
                .padding({ trailing: 20 }),

        )
            .frame(footerFrame)
            .background(Color.white)
    }

}
function Footer(filter: StateValue<FilterType>) {
    return new FooterView(filter).body
}

class TodoBuilder implements ViewBuilder {

    public body(): AnyView {

        return VStack(

            // Title
            HStack(
                Text("todos")
                    .font(Font.system(100, Font.Weight.ultralight))
                    .foregroundColor(titleColor)
            )
                .frame({ height: 100 })
                .padding({ top: 10, bottom: 10 }),

            InputField(listVisible),

            VStack(
                // Todo Item List
                VStack(
                    ForEach(todoItems, (item: TodoItem) => {
                        return TodoListItem(item)
                    })
                )
                    .spacing(0),

                Footer(currentFilter)
            )
                .spacing(0)
                .padding(Edge.bottom, 50)
                .background(Color.white)
                .shadow({
                    color: shadowColor,
                    radius: 3,
                    x: 1,
                    y: 3
                })
                .hidden(listVisible),

            Text("Double-click to edit a todo")
                .font(Font.system(10, Font.Weight.ultralight))
                .foregroundColor(footerColor),

            // Force items to the top
            Spacer()
        )
            .background(backgroundColor)
            .spacing(0)
    }
}

