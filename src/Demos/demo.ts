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

import { SVG } from '@svgdotjs/svg.js'

import { Font } from '../Types/Font'

import { NavigationLink, NavigationView } from '../Views/Navigation/Navigation'

import { Color } from '../Genki'
import { RootLayout, VStack } from '../Genki'
import { AnyView, View, ViewBuilder } from '../Genki'
import { Spacer } from '../Genki'
import { Text } from '../Genki'

import ButtonDemo from './ButtonDemo'
import ImageDemo from './ImageDemo'
import GradientsDemo from './GradientsDemo'
import PathsDemo from './PathsDemo'
import PickersDemo from './PickersDemo'
import ScrollviewDemo from './ScrollviewDemo'
import SliderDemo from './SliderDemo'
import ShapesDemo from './ShapesDemo'
import TextDemo from './TextDemo'


window.onresize = () => {
    View.Layout.invalidate()
}

window.onload = () => {

    View.Context = SVG()
        .addTo('#genki_root')
        .size('100%', '100%')

    View.Layout = new RootLayout()

    const body = new Demo().body()

    // Expand the body to the size of the root layout
    body.layout.setWidthPercent(100)
    body.layout.setHeightPercent(100)

    View.Layout.addChild(body)

    View.Layout.apply()
}

function SidebarItem(title: string, builder: ViewBuilder): AnyView {
    return NavigationLink(
        builder,
        Text(title)
            .font(Font.system(18)),
    )
}

class Demo implements ViewBuilder {

    public body(): AnyView {

        return NavigationView(

            VStack(
                SidebarItem("Buttons", ButtonDemo()),
                SidebarItem("Images", ImageDemo()),
                SidebarItem("Gradients", GradientsDemo()),
                SidebarItem("Paths", PathsDemo()),
                SidebarItem("Pickers", PickersDemo()),
                SidebarItem("Scrollview", ScrollviewDemo()),
                SidebarItem("Shapes", ShapesDemo()),
                SidebarItem("Sliders", SliderDemo()),
                SidebarItem("Text", TextDemo()),
                Spacer()
            )
                .background(Color.sidebar)
                .frame({
                    width: 200,
                    minWidth: 200,
                    minHeight: 500
                })
        )
    }
}


