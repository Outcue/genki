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

import { HStackLayout } from '../Layout/Stack'
import { Spacer } from '../Spacers/Spacer'
import { AnyView, EmptyView, View } from '../View'


export class NavigationViewLayout extends HStackLayout {

    private _hostedView: AnyView
    private _spacer: AnyView

    constructor(view: AnyView) {
        super()

        this.element.data('view', 'Navigation')

        this._hostedView = EmptyView()
        this._spacer = Spacer()

        this.addChildren([
            view,
            this._hostedView,
            Spacer()
        ])
    }

    navigate(destination: AnyView) {

        if (destination.id === this._hostedView.id) {
            return
        }

        this._hostedView.removeSelf()
        this._spacer.removeSelf()
        this.children.length = 0

        this._hostedView = destination

        this.addChild(this._hostedView)
        this.addChild(this._spacer)

        View.Layout.invalidate()
    }
}

export function NavigationView(view: AnyView) {
    return new NavigationViewLayout(view)
}
