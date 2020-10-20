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


import { LGraph, LGraphCanvas, LiteGraph } from 'litegraph.js';

window.onresize = () => {
}

window.onload = () => {

    const graph = new LGraph();

    const canvas = new LGraphCanvas("#graph", graph);

    const node_const = LiteGraph.createNode("basic/const");
    node_const.pos = [200, 200];
    graph.add(node_const);
    node_const.setValue(4.5);

    const node_watch = LiteGraph.createNode("basic/watch");
    node_watch.pos = [700, 200];
    graph.add(node_watch);

    node_const.connect(0, node_watch, 0);

    graph.start()

}



