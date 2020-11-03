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

import { SVG } from '@svgdotjs/svg.js'

import { Connection } from './Connection'
import { DataModelRegistry } from './DataModelRegistry'
import { Node } from './Node'
import { NodeDataModel } from './NodeData'
import { PortIndex, PortType } from './PortType'

// Scene holds connections and nodes
export class NodeScene {

    readonly context = SVG()

    private _connections = new Map<string, Connection>()
    private _nodes = new Map<string, NodeDataModel>()

    constructor(readonly registry: DataModelRegistry) {

        this.context
            .addTo('#genki_root')
            .size(2000, 2000)
    }

    createConnection(
        connectedPort: PortType,
        node: Node,
        portIndex: PortIndex) {

        const connection = new Connection(connectedPort, node, portIndex)

        // const cgo = detail:: make_unique<ConnectionGraphicsObject>(* this, * connection)

        // // After this function connection points are set to node port
        // connection .setGraphicsObject(std:: move(cgo))

        this._connections.set(connection.id, connection)

        this.connectionCreated(connection)

        return connection
    }

    deleteConnection(connection: Connection) {
        this.connectionDeleted(connection);
        connection.removeFromNodes()
        this._connections.delete(connection.id)
    }

    addNode(node: NodeDataModel) {
        this._nodes.set(node.id(), node)
        node.initialize(this)
        this.nodeCreated(node)
    }

    connectionCreated(connection: Connection) {
        // TODO: signal?
    }

    connectionDeleted(connection: Connection) {
        // TODO: signal?
    }

    nodeCreated(node: NodeDataModel) {
        // TODO: signal?
    }
}

