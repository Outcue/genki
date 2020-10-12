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

import { Color, Point } from '../Genki'
import { HStack } from '../Genki'
import { Path } from '../Genki'

class PathsDemoBuilder implements ViewBuilder {

    public body(): AnyView {

        return HStack(

            Path((path: Path) => {
                path.move(Point(40, 0))
                path.addLine(Point(20, 76))
                path.addLine(Point(80, 30.4))
                path.addLine(Point(0, 30.4))
                path.addLine(Point(64, 76))
                path.addLine(Point(40, 0))
            })
                .frame({ width: 300, height: 300 })
                .fill(Color.blue),

            Path((path: Path) => {
                path.move(Point(150, 0))
                path.addLine(Point(0, 300))
                path.addLine(Point(300, 300))
                path.addLine(Point(150, 0))
            })
                .frame({ width: 300, height: 300 })
                .fill(Color.pink)
                .stroke(Color.red, 4),
        )
            .spacing(30)
    }
}

export default function PathsDemo(): ViewBuilder {
    return new PathsDemoBuilder()
}
