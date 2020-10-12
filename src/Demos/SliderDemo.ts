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

import { State, StateChange } from '../Genki'
import { HStack, VStack, Spacer } from '../Genki'
import { AnyView, ViewBuilder } from '../Genki'
import { Text, Slider } from '../Genki'

class SliderDemoBuilder implements ViewBuilder {

    readonly sliderOneMin = 0.0
    readonly sliderOneMax = 100.0
    readonly sliderOneValue = State(this.sliderOneMin)
    readonly sliderOneDisplay = State(this.sliderOneMin.toString())

    readonly sliderTwoMin = 0.0
    readonly sliderTwoMax = 1.0
    readonly sliderTwoValue = State(this.sliderTwoMax)
    readonly sliderTwoDisplay = State(this.sliderTwoMax.toString())

    constructor() {
        this.sliderOneValue.observe((change: StateChange<number>) => {
            this.sliderOneDisplay.set(change.newValue.toString())
        })

        this.sliderTwoValue.observe((change: StateChange<number>) => {
            this.sliderTwoDisplay.set(change.newValue.toString())
        })
    }

    public body(): AnyView {

        return VStack(

            VStack(
                Slider({
                    value: this.sliderOneValue,
                    min: 0,
                    max: 100,
                    step: 1,
                    vertical: false,
                    onEditingChanged: (value: boolean): void => {
                        this.sliderOneDisplay.set(this.sliderOneValue.get().toString())
                    }
                }).frame({ width: 200 }),

                HStack(
                    Text(this.sliderOneMin.toString())
                        .frame({ width: 40 }),
                    Spacer(),
                    Text(this.sliderOneDisplay)
                        .frame({ width: 40 }),
                    Spacer(),
                    Text(this.sliderOneMax.toString())
                )
            )
                .frame({ width: 200, height: 100 }),

            HStack(
                Slider({
                    value: this.sliderTwoValue,
                    min: 0,
                    max: 1.0,
                    step: 0.001,
                    vertical: true,
                    onEditingChanged: (value: boolean): void => {
                        this.sliderTwoDisplay.set(this.sliderTwoValue.get().toString())
                    }
                }).frame({ width: 50, height: 200 }),

                VStack(
                    Text(this.sliderTwoMin.toString())
                        .frame({ width: 40 }),
                    Spacer(),
                    Text(this.sliderTwoDisplay)
                        .frame({ width: 40 }),
                    Spacer(),
                    Text(this.sliderTwoMax.toString())
                )
            )
                .frame({ height: 200 })
        ).spacing(30)
    }
}

export default function SliderDemo(): ViewBuilder {
    return new SliderDemoBuilder()
}