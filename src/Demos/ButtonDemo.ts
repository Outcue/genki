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
import { withAnimation, Animation } from '../Genki'
import { Button } from '../Genki'
import { Color, Font } from '../Genki'
import { State } from '../Genki'
import { HStack } from '../Genki'

class ButtonDemoBuilder implements ViewBuilder {

    private readonly borderColor = State(Color.red)
    private readonly borderWidth = State(1.0)
    private readonly fillColor = State(Color.green)

    private readonly hoverBackground = State(Color.black)
    private readonly hoverForeground = State(Color.white)

    private toggle = false

    public body(): AnyView {

        return HStack(

            Button("Click Me", () => {
            }),

            Button("Disabled", () => {
            })
                .disabled(true),

            Button("Click Me", () => {
            })
                .font(Font.system(24, Font.Weight.ultralight)),

            Button("Outline", () => {
            })
                .font(Font.system(24, Font.Weight.bold))
                .frame({ width: 100, height: 50 })
                .background(Color.white)
                .cornerRadius(5.0)
                .border(Color.gray, 3.0),

            Button("Toggle Color", (button: AnyView) => {

                withAnimation({
                    view: button,
                    animation: Animation.easeInOut()
                }, () => {

                    if (this.toggle) {
                        this.borderColor.set(Color.red)
                        this.borderWidth.set(6.0)
                        this.fillColor.set(Color.green)
                    } else {
                        this.borderColor.set(Color.green)
                        this.borderWidth.set(1.0)
                        this.fillColor.set(Color.red)
                    }
                    this.toggle = !this.toggle
                })
            })
                .background(this.fillColor)
                .cornerRadius(5.0)
                .frame({ width: 100, height: 50 })
                .shadow({ radius: 3, x: 2, y: 2 })
                .border(this.borderColor, this.borderWidth),

            Button("Hover", () => {
            })
                .font(Font.system(20))
                .frame({ width: 100, height: 50 })
                .background(this.hoverBackground)
                .foregroundColor(this.hoverForeground)
                .cornerRadius(5.0)
                .onHover((isHovering: boolean, view: AnyView) => {
                    withAnimation({
                        view: view,
                        animation: Animation.easeInOut()
                    }, () => {
                        if (isHovering) {
                            this.hoverForeground.set(Color.black)
                            this.hoverBackground.set(Color.gray)
                        } else {
                            this.hoverForeground.set(Color.white)
                            this.hoverBackground.set(Color.black)
                        }
                    })
                })

        )
            .spacing(30)
    }
}

export default function ButtonDemo(): ViewBuilder {
    return new ButtonDemoBuilder()
}