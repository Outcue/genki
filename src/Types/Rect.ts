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

export interface RectData {
    width?: number
    height?: number
}

export interface Rect {
    readonly left: number
    readonly top: number
    readonly right: number
    readonly bottom: number
}

class _Rect implements Rect {

    static fromLTRB(
        left: number,
        top: number,
        right: number,
        bottom: number) {
        return new _Rect(left, top, right, bottom)
    }

    constructor(
        readonly left: number = 0.0,
        readonly top: number = 0.0,
        readonly right: number = 0.0,
        readonly bottom: number = 0.0,) {
    }

    public isValid(): boolean {
        return (this.left <= this.right) && (this.top <= this.bottom)
    }
}

export function Rect() {
    return new _Rect()
}

