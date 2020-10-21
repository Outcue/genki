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

export const enum PortType {
    None,
    In,
    Out
}

export const InvalidPort = -1

export type PortIndex = number

export class Port {

    constructor(
        readonly type: PortType = PortType.None,
        private index: PortIndex = InvalidPort) {
    }

    indexIsValid(): boolean { return this.index != InvalidPort }
    portTypeIsValid(): boolean { return this.type != PortType.None }

    oppositePort(port: PortType): PortType {

        var result = PortType.None

        switch (port) {
            case PortType.In:
                result = PortType.Out
                break

            case PortType.Out:
                result = PortType.In
                break

            default:
                break
        }

        return result
    }
}
