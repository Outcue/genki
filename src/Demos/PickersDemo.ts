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

import { Color, Font } from '../Genki'
import { State, StateArray } from '../Genki'
import { HStack } from '../Genki'
import { Button, Picker, Text } from '../Genki'


class PickersDemoBuilder implements ViewBuilder {

    public body(): AnyView {

        var items = StateArray<string>()
        items.push("One")
        items.push("Two")
        items.push("Three")
        items.push("Four")

        var selection = State<string>("")

        return HStack(
            Picker(selection,
                Text("Select:")
                    .italic()
                    .bold()
                    .font(Font.system(18)),
                items
            )
                .frame({ width: 200, height: 100 }),

            Button("Add", () => {
                items.push("Added")
            })
                .background(Color.gray)
                .foregroundColor(Color.white)
                .frame({ width: 64, height: 24 })
                .cornerRadius(5.0),

            Button("Remove", () => {
                items.pop()
            })
                .background(Color.gray)
                .foregroundColor(Color.white)
                .frame({ width: 64, height: 24 })
                .cornerRadius(5.0)
        )
    }
}

export default function PickersDemo(): ViewBuilder {
    return new PickersDemoBuilder()
}