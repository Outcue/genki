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

import { NodeDataModel } from './NodeData'
import { PortType } from './PortType'

export class NodeState {

    //     std:: vector<ConnectionPtrSet> _inConnections;
    //     std:: vector<ConnectionPtrSet> _outConnections;

    //     ReactToConnectionState _reaction;
    //     PortType     _reactingPortType;
    //     NodeDataType _reactingDataType;

    //     bool _resizing;


    //     : _inConnections(model-> nPorts(PortType:: In))
    // , _outConnections(model -> nPorts(PortType:: Out))
    //     , _reaction(NOT_REACTING)
    //     , _reactingPortType(PortType:: None)
    //     , _resizing(false)


    constructor(model: NodeDataModel) {
    }

}