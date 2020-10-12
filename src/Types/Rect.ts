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

export class Rect {

    static fromEmpty() {
        return new Rect(0, 0, 0, 0)
    }

    static fromLTRB(
        left: number,
        top: number,
        right: number,
        bottom: number) {
        return new Rect(left, top, right, bottom)
    }

    constructor(
        readonly left: number,
        readonly top: number,
        readonly right: number,
        readonly bottom: number) {
    }

    public isValid(): boolean {
        return (this.left <= this.right) && (this.top <= this.bottom)
    }

}

