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

import { HStackLayout } from '../Layout/Layouts'
import { TextView } from '../Text/Text'
import { ViewBuilder } from '../View';
import { NavigationViewLayout } from './NavigationView';

export class NavigationLinkDestination {
    constructor(readonly destination: ViewBuilder) {
    }
}

class NavigationLinkView extends HStackLayout {

    readonly _destination: NavigationLinkDestination

    constructor(readonly label: TextView, destination: ViewBuilder) {

        super()

        this._destination = new NavigationLinkDestination(destination)
        this.addChild(label)

        label.onTapGesture(1, () => {

            // The link view is hosted in a NavigationView. Swap out
            // the current destination body with the new body
            var parent = this.getParent()
            while (parent) {
                if (parent instanceof NavigationViewLayout) {
                    break
                }
                parent = parent.getParent()
            }

            if (parent) {
                const navView = parent as NavigationViewLayout
                navView.navigate(this._destination.destination.body())
            } else {
                console.error('Unable to find NavigationView')
            }
        })
    }
}

export function NavigationLink(
    destination: ViewBuilder,
    label: TextView): NavigationLinkView {
    return new NavigationLinkView(label, destination)
}
