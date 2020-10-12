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

import { Router } from './Router'

import { Color } from './Types/Color'

import { VStack } from './Views/Layout/Stack'
import { RootLayout } from './Views/Layout/Layout'

import { AnyView, View, ViewBuilder } from './Views/View'

import { ScrollView } from './Views/Containers/ScrollView'
import { Text } from './Views/Text/Text'


const router = new Router()
router.add('layouts', null)

// MARK: - Window callbacks

window.onresize = () => {
    View.Layout.invalidate()
}

window.onload = () => {

    View.Context = SVG()
        .addTo('#genki_root')
        .size('100%', '100%')

    View.Layout = new RootLayout()

    const body = scrollBody()

    // Expand the body to the size of the root layout
    // body.layout.setWidthPercent(100)
    // body.layout.setHeightPercent(100)
    View.Layout.addChild(body)

    View.Layout.apply()
}

window.onresize = () => {
    View.Layout.invalidate()
}

function scrollBody(): AnyView {

    // const items = [
    //     new TextString('1'),
    //     new TextString('2'),
    //     new TextString('3'),
    //     new TextString('4'),
    //     new TextString('5'),
    //     new TextString('1'),
    //     new TextString('2'),
    //     new TextString('3'),
    //     new TextString('4'),
    //     new TextString('5'),
    //     new TextString('1'),
    //     new TextString('2'),
    //     new TextString('3'),
    //     new TextString('4'),
    //     new TextString('5'),
    //     new TextString('1'),
    //     new TextString('2'),
    //     new TextString('3'),
    //     new TextString('4'),
    //     new TextString('5')
    // ]
    // var values = StateArray<TextString>(items)

    return ScrollView(
        VStack(
            Text('1'),
            Text('2'),
            Text('3'),
            Text('4'),
            Text('5'),
            Text('1'),
            Text('2'),
            Text('3'),
            Text('4'),
            Text('5'),
            Text('1'),
            Text('2'),
            Text('3'),
            Text('4'),
            Text('5'),
            Text('1'),
            Text('2'),
            Text('3'),
            Text('4'),
            Text('5')

            // ForEach(values, (value: TextString) => {
            //     return Text(value.text)
            //         .onTapGesture(1, () => {
            //         })
            // })
        )
            .frame({ width: 300, height: 300 })
            .background(Color.gray)

    )
        .frame({ width: 300, height: 300 })
        .background(Color.blue)
}

