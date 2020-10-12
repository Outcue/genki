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

export function makeUUID() {
    // Reference: https://stackoverflow.com/a/2117523/709884
    return ("10000000-1000-4000-8000-100000000000").replace(/[018]/g, s => {
        const c = Number.parseInt(s, 10)
        return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    })
}

/// A class of types whose instances hold the value of an 
/// entity with stable identity.
export class Identifiable {

    public id: string

    constructor() {
        this.id = makeUUID()
    }

}