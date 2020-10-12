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

import { AnyView } from '../Views/View'

const enum AnimationType {
    easeInOut,
    easeIn,
    easeOut,
    linear
}

const AnimationMap = new Map<AnimationType, string>(
    [
        [AnimationType.easeInOut, '<>'],
        [AnimationType.easeOut, '>'],
        [AnimationType.easeIn, '<'],
        [AnimationType.linear, '-']
    ]
)

export class Animation {

    static Time = 400

    constructor(
        readonly duration: number = Animation.Time,
        readonly type: AnimationType = AnimationType.easeInOut) {
    }

    public ease(): string {
        return AnimationMap[this.type]
    }
}

export namespace Animation {

    export const basic = new Animation()

    export function easeInOut(duration: number = Animation.Time): Animation {
        return new Animation(duration, AnimationType.easeInOut)
    }

    export function easeIn(duration: number = Animation.Time): Animation {
        return new Animation(duration, AnimationType.easeIn)
    }

    export function easeOut(duration: number = Animation.Time): Animation {
        return new Animation(duration, AnimationType.easeOut)
    }

    export function linear(duration: number = Animation.Time): Animation {
        return new Animation(duration, AnimationType.linear)
    }
}

type AnimationCallback = (view: AnyView) => void

interface AnimationParams {
    view: AnyView
    animation?: Animation
}

export function withAnimation(
    params: AnimationParams,
    callback: AnimationCallback) {
    params.view.beginAnimation(params.animation)
    callback(params.view)
    params.view.commitAnimation()
}
