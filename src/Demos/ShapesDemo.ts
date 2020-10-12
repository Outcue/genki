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

import { Color } from '../Genki'
import { HStack } from '../Genki'
import { Capsule, Circle, Ellipse, Rectangle, RoundedRectangle } from '../Genki'

class ShapesDemoBuilder implements ViewBuilder {

    public body(): AnyView {

        return HStack(

            Circle()
                .frame({ width: 100, height: 100 })
                .fill(Color.orange)
                .shadow({ radius: 5.0, x: 1.0, y: 1.0 }),

            Rectangle()
                .frame({ width: 100, height: 100 })
                .fill(Color.pink)
                .shadow({ radius: 5.0, x: 1.0, y: 1.0 }),

            Ellipse()
                .frame({ width: 100, height: 120 })
                .fill(Color.yellow)
                .stroke(Color.black, 1)
                .onTapGesture(1, () => {
                }),

            RoundedRectangle(10)
                .frame({ width: 100, height: 100 })
                .fill(Color.green)
                .stroke(Color.blue, 3)
                .shadow({ radius: 5.0, x: 1.0, y: 1.0 }),

            Capsule()
                .frame({ width: 100, height: 50 })
                .fill(Color.purple)
                .stroke(Color.green, 3)
        )
            .spacing(30)
    }
}

export default function ShapesDemo(): ViewBuilder {
    return new ShapesDemoBuilder()
}
