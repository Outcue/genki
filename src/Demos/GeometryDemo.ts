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

import { Spacer, VStack } from '../Genki'
import { Image, } from '../Genki'

class GeometryDemoBuilder implements ViewBuilder {

    public body(): AnyView {

        const imageOne = "https://upload.wikimedia.org/wikipedia/commons/a/a5/Pionites_leucogaster_-Parque_de_las_Aves_-Foz_de_Iguazu-6a-4c.jpg"
        const imageTwo = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.LlS0zU2ik8NaELG1FwGJcwD8D3%26pid%3DApi&f=1"

        return VStack(

            Image()
                .frame({ width: 300, height: 300 })
                .url(imageOne)
                .padding({ top: 30 }),

            Image()
                .frame({ width: 300, height: 100 })
                .url(imageTwo)
                .scaledToFit()
                .padding({ top: 30 }),

            Spacer()
        )
            .spacing(30)
    }
}

export default function GeometryDemo(): ViewBuilder {
    return new GeometryDemoBuilder()
}
