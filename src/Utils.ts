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

// Let's assume "class X {}". X itself can be called with "new" keyword, thus it extends this type
type Constructor = new (...args: Array<any>) => any;

// Extracts argument types from class constructor
type ConstructorArgs<TConstructor extends Constructor> =
    TConstructor extends new (...args: infer TArgs) => any ? TArgs : never;

// Extracts class instance type from class constructor
type ConstructorClass<TConstructor extends Constructor> =
    TConstructor extends new (...args: Array<any>) => infer TClass ? TClass : never;

// This is what we want: to be able to create new class instances either with or without "new" keyword
type CallableConstructor<TConstructor extends Constructor> =
    TConstructor & ((...args: ConstructorArgs<TConstructor>) => ConstructorClass<TConstructor>);

// Takes a regular constructor and creates a "callable" one
export function CreateCallableConstructor<TConstructor extends Constructor>(
    type: TConstructor
): CallableConstructor<TConstructor> {
    function createInstance(
        ...args: ConstructorArgs<TConstructor>
    ): ConstructorClass<TConstructor> {
        return new type(...args);
    }

    createInstance.prototype = type.prototype;
    return createInstance as CallableConstructor<TConstructor>;
}