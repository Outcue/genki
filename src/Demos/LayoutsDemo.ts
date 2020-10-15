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

import { State } from '../Genki'
import { Color, Font, Rectangle } from '../Genki'
import { HStack, VStack, ZStack } from '../Genki'
import { Text, TextField } from '../Genki'

class LayoutsDemoBuilder implements ViewBuilder {

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

export default function LayoutsDemo(): ViewBuilder {
    return new LayoutsDemoBuilder()
}
