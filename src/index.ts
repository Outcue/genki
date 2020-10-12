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

import { SVG } from '@svgdotjs/svg.js'

import { Router } from './Router'

import { State } from './Bindings/State'

import { Color } from './Types/Color'
import { Font } from './Types/Font'
import { Identifiable } from './Types/Identifiable'


import { HStack, VStack, ZStack } from './Views/Layout/Stack'
import { RootLayout } from './Views/Layout/Layout'

import { AnyView, View, ViewBuilder } from './Views/View'
import { NavigationLink, NavigationView } from './Views/Navigation/Navigation'
import { Spacer } from './Views/Spacers/Spacer'
import { Text, TextField, SecureTextField, TextView } from './Views/Text/Text'

import { Rectangle } from './Shapes/Rectangle'


const router = new Router()
router.add('layouts', null)

// MARK: - Window callbacks

window.onresize = () => {
    View.Layout.invalidate()
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
window.onload = () => {

    initialize()

    const body = sidebarBody()

    // Expand the body to the size of the root layout
    body.layout.setWidthPercent(100)
    body.layout.setHeightPercent(100)

    View.Layout.addChild(body)

    View.Layout.apply()
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function initialize() {

    View.Context = SVG()
        .addTo('#genki_root')
        .size('100%', '100%')

    View.Layout = new RootLayout()
}


// MARK: - Layout

class HStackExampleBuilder implements ViewBuilder {

    public body(): AnyView {

        return VStack(

            VStack(
                Text("Top"),

                Spacer(),

                // Left
                HStack(
                    Text("One"),
                    Text("Two"),
                    Text("Three"),
                    Spacer()
                ),

                // Centered
                HStack(
                    Text("One"),
                    Text("Two"),
                    Text("Three")
                ),

                // Right
                HStack(
                    Spacer(),
                    Text("One"),
                    Text("Two"),
                    Text("Three")
                )
            )
        )
    }
}
function HStackExample() { return new HStackExampleBuilder() }

class TestBuilder implements ViewBuilder {

    public body(): AnyView {
        return HStack(
            Text("INNER")
                .font(Font.system(30))
        )
    }
}
function Test() { return new TestBuilder() }

class NavigationExample implements ViewBuilder {

    public body(): AnyView {

        return HStack(

            VStack(

                NavigationLink(

                    Test(),

                    Text("Link One")
                        .font(Font.system(30)),
                ),

                Spacer()
            ),

            Spacer()
        )
    }
}

class ZStackExampleBuilder implements ViewBuilder {

    public body(): AnyView {

        var itemText = State("")

        const frame = { width: 550, height: 65 }
        const inputFrame = { width: 475, height: 65 }

        return VStack(

            ZStack(

                VStack(

                    HStack(
                        Text(">")
                            .font(Font.system(30))
                            .foregroundColor(Color.gray)
                            .padding({ leading: 30, trailing: 20 }),

                        TextField({
                            text: itemText,
                            placeholder: "What needs to be done?",
                            onEditingChanged: (_: boolean): void => {
                            },
                            onCommit: (): void => {
                            }
                        })
                            .frame(inputFrame)
                            .font(Font.italic(24, Font.Weight.ultralight))
                            .focus(true),
                    ),

                    Rectangle()
                        .background(Color.red)
                        .frame({ width: frame.width, height: 1 })
                        .offset({ y: -2 })

                )
            )
                .frame(frame)
                .background(Color.white)
                .shadow({
                    color: Color(.5, .5, .5, .2),
                    radius: 3, x: 1, y: 3
                }),
        )
    }
}
function ZStackExample() { return new ZStackExampleBuilder() }

// function circleBody(): AnyView {

//     const color = State(Color.green)
//     const size = State(100)

//     return HStack(

//         Circle()
//             .frame({ width: 100, height: 100 })
//             .fill(color)
//             .onAppear(() => {
//             })
//             .onDisappear(() => {
//             }),

//         Circle()
//             .frame({ width: 100, height: 100 })
//             .fill(Color.yellow),

//         Circle()
//             .frame({ width: 100, height: 100 })
//             .fill(Color.red),

//         VStack(

//             Circle()
//                 .frame({ width: 300, height: 300 })
//                 .fill(Color.purple)
//                 .shadow({ radius: 10, x: 3, y: 3 }),

//             Circle()
//                 .frame({ width: size, height: size })
//                 .fill(Color.orange),

//             Circle()
//                 .frame({ width: 100, height: 100 })
//                 .fill(Color.pink),

//             Button("Red", () => {
//                 color.set(Color.red)
//             })
//                 .background({ r: .3, g: .25, b: 1 })
//                 .frame({ width: 100, height: 100 })
//         ),

//         Circle()
//             .frame({ width: 100, height: 100 })
//             .fill(Color.blue)
//     )
//         .background(Color.white)
//         .cornerRadius(10)
// }

// function layoutBody(): AnyView {

//     return VStack(

//         VStack(
//             Text("Upper"),
//             Text("Two"),
//             Text("Three"),
//             Text("Four"),
//             Text("Five"),
//         ).background(Color.green),

//         VStack(
//             Text("Lower"),
//             Text("Two"),
//             Text("Three"),
//             Text("Four"),
//             Text("Five"),
//         ).background(Color.blue)
//     ).background(Color.blue)
// }

// function layout2Body(): AnyView {

//     const width = 800
//     const size = 200

//     return VStack(
//         Spacer(),

//         HStack(
//             ZStack(
//                 Rectangle()
//                     .background(Color.gray)
//                     .frame({ width: size, height: size }),

//                 Rectangle()
//                     .background(Color.blue)
//                     .frame({ width: 20, height: 100 }),

//                 Text("1"),
//             ),
//             Text('Hello'),
//             Text('Hi'),
//         ),

//         Spacer()
//     )
// }

class TextString extends Identifiable {
    constructor(readonly text: string) {
        super()
    }
}

// return List(

//     Rectangle()
//         .frame({ width: 100, height: 100 })
//         .background(Color.pink),

//     Rectangle()
//         .frame({ width: 100, height: 300 })
//         .background(Color.red),

//     Text('1'),
//     Text('2'),
//     Text('3'),
//     Text('4'),
//     Text('5'),
//     Text('6'),
//     Text('7'),
//     Text('8'),
//     Text('9'),
//     Text('10'),
//     Text('11'),
//     Text('12'),
//     Text('13'),
//     Text('14'),
//     Text('15'),
//     Text('16'),
//     Text('17'),
//     Text('18'),
//     Text('19'),
//     Text('20')

// ).frame({ width: 300, height: 300 })
//}



function sidebarBody(): AnyView {

    return NavigationView(

        VStack(
            NavigationLink(
                Test(),
                Text("Link One")
                    .font(Font.system(14)),
            ),

            NavigationLink(
                Test(),
                Text("Link One")
                    .font(Font.system(14)),
            ),

            NavigationLink(
                Test(),
                Text("Link One")
                    .font(Font.system(14)),
            ),

            NavigationLink(
                Test(),
                Text("Link One")
                    .font(Font.system(14)),
            ),

            NavigationLink(
                Test(),
                Text("Link One")
                    .font(Font.system(14)),
            ),

            Spacer()

        )
            .padding({ leading: 15, top: 15 })
    )
}

// function sliderBody(): AnyView {

//     const sliderValue = State(10.0)

//     sliderValue.observe((change: StateChange<number>) => {
//         console.log(change.oldValue, "->", change.newValue)
//     })

//     return HStack(

//         Slider({
//             value: sliderValue,
//             min: 0,
//             max: 500,
//             step: 1,
//             vertical: false,
//             onEditingChanged: (value: boolean): void => {
//                 console.log(value)
//             }
//         })
//             .frame({ width: 400, height: 300 }),

//         Slider({
//             value: sliderValue,
//             min: 0,
//             max: 500,
//             step: 1,
//             vertical: true,
//             onEditingChanged: (value: boolean): void => {
//                 console.log(value)
//             }
//         })
//             .frame({ width: 400, height: 300 })
//     )
// }

// function stackBody(): AnyView {

//     return VStack(

//         HStack(
//             Text("Hello"),
//             Spacer()
//         )

//     ).background(Color.gray)
// }

// function textBody(): Layout {

//     var itemText = State<string>("")

//     return ZStack(
//         HStack(
//             TextField({
//                 text: itemText,
//                 placeholder: "What needs to be done?",
//                 onEditingChanged: (_: boolean): void => {
//                 },
//                 onCommit: (): void => {
//                 }
//             })
//         )
//             .frame({ width: 100, height: 100 })
//     )
// }


// function textBody(): Layout {

//     const fillColor = State(Color.green)

//     return HStack(

//         Spacer(),

//         VStack(

//             Text("Hello World")
//                 .foregroundColor(Color.blue)
//                 .bold()
//                 .italic()
//                 .underline(true),

//             Text("Italic Text Field")
//                 .italic()
//                 .bold()
//                 .strikethrough(true)
//                 .underline(true),

//             Text("Static Text Field")
//                 .foregroundColor(Color.white)
//                 .background(fillColor),

//             TextField({
//                 placeholder: "Editable Text Field ",
//                 onEditingChanged: (_: boolean): void => {
//                 },
//                 onCommit: (): void => {
//                 }
//             })
//                 .frame({ width: 300, height: 30 })
//                 .background(Color.red),

//             SecureTextField({
//                 placeholder: "Secret "
//             })
//                 .frame({ width: 300, height: 30 })
//                 .background(Color.red),

//             Button("Click Me", () => {
//                 fillColor.value = Color.red
//             })
//                 .background(fillColor)
//                 .cornerRadius(5.0)
//                 .shadow({ radius: 3, x: 2, y: 2 }),

//             Circle()
//                 .frame({ width: 100, height: 100 })
//                 .fill(Color.purple)
//                 .shadow({ radius: 5, x: 3, y: 3 }),
//         ),

//         Spacer()
//     )
// }

// function toggleBody(): AnyView {

//     return VStack(
//         // Toggle("One",
//         //     State<boolean>(false).subscribe((value: boolean) => {
//         //         console.log("subscribe: ", value)
//         //     })
//         // )
//         //     .frame({ width: 400, height: 100 }),

//         // Toggle("Two: Checkbox Item",
//         //     State<boolean>(false).subscribe((value: boolean) => {
//         //         console.log("subscribe: ", value)
//         //     })
//         // )
//         //     .frame({ width: 400, height: 100 })

//     )
// }


