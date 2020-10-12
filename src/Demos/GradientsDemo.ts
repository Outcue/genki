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


import { Color, Gradient, UnitPoint } from '../Genki'
import { HStack, VStack, } from '../Genki'
import { LinearGradient, RadialGradient } from '../Views/Gradient'
import { Text } from '../Genki'

class GradientsDemoBuilder implements ViewBuilder {

    private static Size = 150.0

    constructor() {
    }

    public body(): AnyView {

        const twoColors = [Color.black, Color.red]
        const threeColors = [Color.yellow, Color.green, Color.red]

        return VStack(

            HStack(

                VStack(
                    LinearGradient(Gradient(
                        twoColors,
                        UnitPoint.top,
                        UnitPoint.bottom))
                        .frame({
                            width: GradientsDemoBuilder.Size,
                            height: GradientsDemoBuilder.Size
                        }),
                    Text("top to bottom")
                ),

                VStack(
                    LinearGradient(Gradient(
                        twoColors,
                        UnitPoint.bottom,
                        UnitPoint.top))
                        .frame({
                            width: GradientsDemoBuilder.Size,
                            height: GradientsDemoBuilder.Size
                        }),
                    Text("bottom to top")
                ),

                VStack(
                    LinearGradient(Gradient(
                        twoColors,
                        UnitPoint.leading,
                        UnitPoint.trailing))
                        .frame({
                            width: GradientsDemoBuilder.Size,
                            height: GradientsDemoBuilder.Size
                        }),
                    Text("leading to trailing")
                ),

                VStack(
                    LinearGradient(Gradient(
                        twoColors,
                        UnitPoint.trailing,
                        UnitPoint.leading))
                        .frame({
                            width: GradientsDemoBuilder.Size,
                            height: GradientsDemoBuilder.Size
                        }),
                    Text("trailing to leading")
                ),

                VStack(
                    LinearGradient(Gradient(
                        twoColors,
                        UnitPoint.topLeading,
                        UnitPoint.bottomTrailing))
                        .frame({
                            width: GradientsDemoBuilder.Size,
                            height: GradientsDemoBuilder.Size
                        }),
                    Text("top-leading to bottom-trailing")
                ),

                VStack(
                    LinearGradient(Gradient(
                        twoColors,
                        UnitPoint.bottomTrailing,
                        UnitPoint.topLeading))
                        .frame({
                            width: GradientsDemoBuilder.Size,
                            height: GradientsDemoBuilder.Size
                        }),
                    Text("bottom-trailing to top-leading")
                )
            )
                .spacing(30),

            HStack(

                VStack(
                    LinearGradient(Gradient(
                        threeColors,
                        UnitPoint.top,
                        UnitPoint.bottom))
                        .frame({
                            width: GradientsDemoBuilder.Size,
                            height: GradientsDemoBuilder.Size
                        }),
                    Text("top to bottom")
                ),

                VStack(
                    LinearGradient(Gradient(
                        threeColors,
                        UnitPoint.bottom,
                        UnitPoint.top))
                        .frame({
                            width: GradientsDemoBuilder.Size,
                            height: GradientsDemoBuilder.Size
                        }),
                    Text("bottom to top")
                ),

                VStack(
                    LinearGradient(Gradient(
                        threeColors,
                        UnitPoint.leading,
                        UnitPoint.trailing))
                        .frame({
                            width: GradientsDemoBuilder.Size,
                            height: GradientsDemoBuilder.Size
                        }),
                    Text("leading to trailing")
                ),

                VStack(
                    LinearGradient(Gradient(
                        threeColors,
                        UnitPoint.trailing,
                        UnitPoint.leading))
                        .frame({
                            width: GradientsDemoBuilder.Size,
                            height: GradientsDemoBuilder.Size
                        }),
                    Text("trailing to leading")
                ),

                VStack(
                    LinearGradient(Gradient(
                        threeColors,
                        UnitPoint.topLeading,
                        UnitPoint.bottomTrailing))
                        .frame({
                            width: GradientsDemoBuilder.Size,
                            height: GradientsDemoBuilder.Size
                        }),
                    Text("top-leading to bottom-trailing")
                ),

                VStack(
                    LinearGradient(Gradient(
                        threeColors,
                        UnitPoint.bottomTrailing,
                        UnitPoint.topLeading))
                        .frame({
                            width: GradientsDemoBuilder.Size,
                            height: GradientsDemoBuilder.Size
                        }),
                    Text("bottom-trailing to top-leading")
                )
            )
                .spacing(30),

            HStack(

                VStack(
                    RadialGradient(Gradient(
                        twoColors,
                        UnitPoint.top,
                        UnitPoint.bottom))
                        .frame({
                            width: GradientsDemoBuilder.Size,
                            height: GradientsDemoBuilder.Size
                        }),
                    Text("top to bottom")
                ),
            )
                .spacing(30),

            HStack(

                VStack(
                    RadialGradient(Gradient(
                        threeColors,
                        UnitPoint.top,
                        UnitPoint.bottom))
                        .frame({
                            width: GradientsDemoBuilder.Size,
                            height: GradientsDemoBuilder.Size
                        }),
                    Text("top to bottom")
                ),
            )
                .spacing(30)
        )
    }
}

export default function GradientsDemo(): ViewBuilder {
    return new GradientsDemoBuilder()
}