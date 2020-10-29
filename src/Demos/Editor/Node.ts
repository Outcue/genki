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

import { Point } from '@svgdotjs/svg.js'

import { Connection } from './Connection'
import { BaseNode, makeUUID, NodeData, NodeDataModel, NodeDataType } from './NodeData'
import { NodeGeometry } from './NodeGeometry'
import { NodeGraphicsObject } from './NodeGraphicsObject'
import { NodeState, NodeConnectionReaction } from './NodeState'
import { PortIndex, PortType } from './PortType'

export class Node extends BaseNode {

    readonly nodeState: NodeState
    private _nodeGeometry: NodeGeometry
    private _nodeGraphicsObject?: NodeGraphicsObject

    constructor(readonly nodeDataModel: NodeDataModel) {
        super()
        this.nodeState = new NodeState(nodeDataModel)
        this._nodeGeometry = new NodeGeometry(this.nodeDataModel)
        this._nodeGeometry.recalculateSize()

        //     // propagate data: model => node
        // connect(_nodeDataModel.get(),
        //         &NodeDataModel::dataUpdated,
        //         this,
        //         &Node::onDataUpdated);

        // connect(_nodeDataModel.get(),
        //         &NodeDataModel::captionChanged,
        //         this,
        //         &Node::onCaptionChanged);

        // connect(_nodeDataModel.get(),
        //         &NodeDataModel::layoutChanged,
        //         this,
        //         &Node::onLayoutChanged);
    }

    get nodeGeometry(): NodeGeometry {
        return this._nodeGeometry
    }

    set nodeGraphicsObject(object: NodeGraphicsObject) {
        this._nodeGraphicsObject = object

    }

    /// Propagates incoming data to the underlying model.
    propagateData(nodeData: NodeData, index: PortIndex): void {

        this.nodeDataModel.setInData(nodeData, index)
        this.updateVisuals()
    }

    /// Fetches data from model's OUT #index port
    /// and propagates it to the connection
    onDataUpdated(port: PortIndex) {

        const nodeData = this.nodeDataModel.outData(port)
        const connections = this._nodeState.connections(PortType.Out, port)
        connections.forEach((value: Connection, _: string) => {
            value.propagateData(nodeData)
        })
    }

    updateVisuals() {
    }

    reactToPossibleConnection(
        reactingPortType: PortType,
        reactingDataType: NodeDataType,
        scenePoint: Point) {
        //const t = _nodeGraphicsObject -> sceneTransform();
        //const p = t.inverted().map(scenePoint);
        //_nodeGeometry.setDraggingPosition(p)
        //_nodeGraphicsObject -> update();
        this.nodeState.setReaction(
            NodeConnectionReaction.Reacting,
            reactingPortType,
            reactingDataType)
    }

    resetReactionToConnection() {
        this.nodeState.setReaction(NodeConnectionReaction.NotReacting)
        this.nodeGraphicsObject.update()
    }

}
