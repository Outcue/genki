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

import { Geometry, GeometryReader } from '../Genki'
import { Angle, Color, Path, Point } from '../Genki'
import { AnyView, ViewBuilder } from '../Genki'

class RoundedCorners implements ViewBuilder {

    private color = Color.black
    private tl = 0.0 // top-left radius parameter
    private tr = 0.0 // top-right radius parameter
    private bl = 0.0 // bottom-left radius parameter
    private br = 0.0 // bottom-right radius parameter

    public body(): AnyView {

        return GeometryReader((geometry: Geometry) => {

            return Path((path: Path) => {

                path.move(Point(40, 0))
                path.addLine(Point(20, 76))
                path.addLine(Point(80, 30.4))
                path.addLine(Point(0, 30.4))
                path.addLine(Point(64, 76))
                path.addLine(Point(40, 0))

                // const w = geometry.size.width
                // const h = geometry.size.height

                // // We make sure the radius does not exceed the bounds dimensions
                // const tr = Math.min(Math.min(this.tr, h / 2), w / 2)
                // const tl = Math.min(Math.min(this.tl, h / 2), w / 2)
                // const bl = Math.min(Math.min(this.bl, h / 2), w / 2)
                // const br = Math.min(Math.min(this.br, h / 2), w / 2)

                // path.move(Point(w / 2.0, 0))
                // path.addLine(Point(w - tr, 0))
                // path.addArc(Point(w - tr, tr), tr, Angle({ degrees: -90 }), Angle({ degrees: 0 }), false)
                // path.addLine(Point(w, h - br))
                // path.addArc(Point(w - br, h - br), br, Angle({ degrees: 0 }), Angle({ degrees: 90 }), false)
                // path.addLine(Point(bl, h))
                // path.addArc(Point(bl, h - bl), bl, Angle({ degrees: 90 }), Angle({ degrees: 180 }), false)
                // path.addLine(Point(0, tl))
                // path.addArc(Point(tl, tl), tl, Angle({ degrees: 180 }), Angle({ degrees: 270 }), false)
            })
                .fill(this.color)
                .frame({ width: geometry.size.width, height: geometry.size.height })
        })
    }
}

class GeometryDemoBuilder implements ViewBuilder {

    public body(): AnyView {
        return new RoundedCorners().body()
    }
}

export default function GeometryDemo(): ViewBuilder {
    return new GeometryDemoBuilder()
}
