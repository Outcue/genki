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
import { ForEach, Identifiable, State, StateArray } from '../Genki'
import { ScrollView, Text } from '../Genki'
import { VStack } from '../Genki'

class TextString extends Identifiable {
    constructor(readonly text: string) {
        super()
    }
}

const items = [
    new TextString('1'),
    new TextString('2'),
    new TextString('3'),
    new TextString('4'),
    new TextString('5')
]

const values = StateArray<TextString>(items)


class ScrollviewDemoBuilder implements ViewBuilder {

    public body(): AnyView {

        return ScrollView(

            VStack(
                ForEach(values, (value: TextString) => {
                    return Text(value.text)
                        .onTapGesture(1, () => {
                        })
                })

            ).frame({ width: 300, height: 300 })

        )
    }
}

export default function ScrollviewDemo(): ViewBuilder {
    return new ScrollviewDemoBuilder()
}