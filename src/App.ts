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

import { RootLayout, View } from './Genki'

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

export interface App {

    // var body: Body { get }

    //     /// Implemented by the renderer to mount the `App`
    //     static func _launch(_ app: Self,
    //     _ rootEnvironment: EnvironmentValues)
    // /// Implemented by the renderer to update the `App` on `ScenePhase` changes
    // var _phasePublisher: CurrentValueSubject<ScenePhase, Never> { get }

    //     static func main()

    // init()
}

