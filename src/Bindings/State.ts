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

import { isObservable, observable, } from 'mobx'

export { IValueDidChange as StateChange } from 'mobx'
export { IObservableValue as StateValue } from 'mobx'
export { IObservableArray as StateArrayValue } from 'mobx'
export { IArraySplice as StateArrayChange } from 'mobx'

export { observe as observe } from 'mobx'

export function isState(object: any) {
    return isObservable(object)
}

export function State<T>(value: T) {
    return observable.box(value)
}

export function StateArray<T>(items?: T[]) {
    const array = items ? items : new Array<T>()
    return observable.array(array)
}

