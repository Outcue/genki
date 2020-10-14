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

import { StateChange } from '../../Bindings/State'
import { Size } from '../../Types/Size'
import { Layout } from './Layout'
import { AnyView } from '../View'

export interface Geometry {
    size: Size
}

class _Geometry implements Geometry {
    constructor(readonly size: Size) {
    }
}

function Geometry(width: number, height: number) {
    return new _Geometry(Size(width, height))
}

type GeometryCalback = (geometry: Geometry) => AnyView

export class GeometryReaderView extends Layout {

    constructor(private callback: GeometryCalback) {
        super()
        this.group.data('layout', 'GeometryReader')
    }

    public added() {

        const parent = this.getParent()
        this.frame({ width: parent.getWidth(), height: parent.getHeight() })

        const child = this.callback(
            Geometry(
                this.getWidth(),
                this.getHeight()))
        this.addChild(child)

        this.observeX((change: StateChange<number>) => {
        })

        this.observeY((change: StateChange<number>) => {
        })

        this.observeWidth((change: StateChange<number>) => {
            // this.removeAll()
            // const child = this.callback(Geometry(this.getWidth(), change.newValue))
            // this.addChild(child)
        })

        this.observeHeight((change: StateChange<number>) => {
            // this.removeAll()
            // const child = this.callback(Geometry(change.newValue, this.getHeight()))
            // this.addChild(child)
        })
    }
}

export function GeometryReader(callback: GeometryCalback) {
    return new GeometryReaderView(callback)
}