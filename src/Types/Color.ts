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

function clamp(num: number, min: number, max: number): number {
    return num <= min ? min : num >= max ? max : num;
}

export interface Color {
    readonly r: number,
    readonly g: number,
    readonly b: number,
    readonly a: number
}

class _Color implements Color {

    constructor(
        readonly r: number,
        readonly g: number,
        readonly b: number,
        readonly a: number = 1.0) {
    }

    public toString(): string {
        const red = (clamp(this.r, 0.0, 1.0) * 255.0).toFixed()
        const green = (clamp(this.g, 0.0, 1.0) * 255.0).toFixed()
        const blue = (clamp(this.b, 0.0, 1.0) * 255.0).toFixed()
        const result = 'rgb(' + red + ', ' + green + ', ' + blue + ')'
        return result
    }

    public toHex(): string {
        const red = (clamp(this.r, 0.0, 1.0) * 255.0).toFixed()
        const green = (clamp(this.g, 0.0, 1.0) * 255.0).toFixed()
        const blue = (clamp(this.b, 0.0, 1.0) * 255.0).toFixed()
        const result = 'rgb(' + red + ', ' + green + ', ' + blue + ')'
        return result
    }
}


export function Color(
    red: number,
    green: number,
    blue: number,
    alpha: number = 1.0): Color {
    return new _Color(red, green, blue, alpha)
}

// https://en.wikipedia.org/wiki/HSL_and_HSV#HSL_to_RGB_alternative
// public init(hue: Double, saturation: Double, brightness: Double, opacity: Double = 1) {
//     let a = saturation * min(brightness / 2, 1 - (brightness / 2))
//     let f = { (n: Int) -> Double in
//       let k = Double((n + Int(hue * 12)) % 12)
//       return brightness - (a * max(-1, min(k - 3, 9 - k, 1)))
//     }
//     self.init(.sRGB, red: f(0), green: f(8), blue: f(4), opacity: opacity)
//   }

export namespace Color {

    export const clear = Color(0.0, 0.0, 0.0, 0.0)
    export const black = Color(0.0, 0.0, 0.0, 1.0)
    export const white = Color(1.0, 1.0, 1.0, 1.0)
    export const gray = Color(0.5, 0.5, 0.5, 1.0)
    export const red = Color(1.0, 0.0, 0.0, 1.0)
    export const green = Color(0.0, 1.0, 0.0, 1.0)
    export const blue = Color(0.0, 0.0, 1.0, 1.0)
    export const orange = Color(1.0, 0.65, 0.0, 1.0)
    export const yellow = Color(1.0, 1.0, 0.0, 1.0)
    export const pink = Color(1.0, 0.75, 0.79, 1.0)
    export const purple = Color(0.5, 0.0, 0.5, 1.0)

    export const sidebar = Color(0.949, 0.949, 0.969)
    export const text = Color(0.0, 0.0, 0.0)

    export function isRGBA(object: any): object is Color {
        return 'r' in object
            && 'g' in object
            && 'b' in object
    }

}


