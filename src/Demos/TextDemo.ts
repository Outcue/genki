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

import { AnyView, ViewBuilder } from '../Genki'

import { Color, Font, State } from '../Genki'
import { HStack, VStack } from '../Genki'
import { Text, TextField, SecureTextField } from '../Genki'

class TextDemoBuilder implements ViewBuilder {

    private readonly itemText = State<string>("")
    private readonly secureText = State<string>("")

    constructor() {
    }

    public body(): AnyView {

        return HStack(

            VStack(
                Text("Hello World")
                    .foregroundColor(Color.blue)
                    .bold()
                    .italic()
                    .underline(true),

                Text("Italic Text")
                    .font(Font.italic(
                        24,
                        Font.Weight.regular,
                        Font.Design.serif)),

                Text("Serif Text")
                    .font(Font.system(
                        44,
                        Font.Weight.regular,
                        Font.Design.serif)),

                Text("Italic Text")
                    .italic()
                    .bold()
                    .strikethrough(true)
                    .underline(true),

                Text("Static Text Field")
                    .foregroundColor(Color.white)
                    .background(Color.black),

                TextField({
                    text: this.itemText,
                    placeholder: "What needs to be done?",
                    onEditingChanged: (_: boolean): void => {
                    },
                    onCommit: (): void => {
                    }
                })
                    .frame({ width: 100, height: 40 })
                    .font(Font.italic(24, Font.Weight.ultralight))
                    .focus(true),

                SecureTextField({
                    text: this.secureText,
                    placeholder: "Secret"
                })
                    .frame({ width: 100, height: 40 })
                    .background(Color.red),
            )
        )
    }
}

export default function TextDemo(): ViewBuilder {
    return new TextDemoBuilder()
}