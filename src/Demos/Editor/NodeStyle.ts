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

import { Color } from '@svgdotjs/svg.js'

interface NodeStyleBase {
    loadJsonText(jsonText: string): void
    loadJsonFile(fileName: string): void
}

export class NodeStyle implements NodeStyleBase {

    NormalBoundaryColor = new Color(255, 255, 255, 'rgb')
    SelectedBoundaryColor = new Color(255, 165, 0, 'rgb')
    FillColor = new Color(89, 89, 89, 'rgb')
    ShadowColor = new Color(20, 20, 20, 'rgb')
    FontColor = new Color(255, 255, 255, 'rgb')
    FontColorDim = new Color(200, 200, 200, 'rgb')

    ConnectionPointColor = new Color(169, 169, 169, 'rgb')
    FilledConnectionPointColor = new Color(0, 255, 255, 'rgb')

    WarningColor = new Color(128, 128, 0, 'rgb')
    ErrorColor = new Color(255, 0, 0, 'rgb')

    PenWidth = 1.0
    HoveredPenWidth = 1.5

    ConnectionPointDiameter = 8.0
    Opacity = 0.8
    Accentuate = false

    loadJsonText(jsonText: string): void {
    }

    loadJsonFile(fileName: string): void {
    }
}

export class ConnectionStyle implements NodeStyleBase {
    loadJsonText(jsonText: string): void {
    }

    loadJsonFile(fileName: string): void {
    }

}

export class NodeViewStyle implements NodeStyleBase {
    loadJsonText(jsonText: string): void {
    }

    loadJsonFile(fileName: string): void {
    }

}
