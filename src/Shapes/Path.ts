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

import { Path as PathSvg } from '@svgdotjs/svg.js'

import { Angle, Point } from '../Types/Types';
import { Shape } from '../Shapes/Shape'
import { View } from '../Views/View';

const enum Command {
    move,
    lineTo,
    quadCurve,
    curve,
    closeSubpath
}

class PathCommand {

    public points = new Array<Point>()

    constructor(readonly type: Command) {
    }

    public addPoints(points: Point[]) {
        for (var point of points) {
            this.points.push(point)
        }
    }
}

function Element(type: Command, ...points: Point[]) {
    const element = new PathCommand(type)
    element.addPoints(points)
    return element
}

function degrees_to_radians(degrees: number) {
    var pi = Math.PI
    return degrees * (pi / 180)
}


type PathAction = (path: PathImpl) => void

export interface Path {
    move(p: Point): PathImpl
    addArc(center: Point, radius: number, startAngle: Angle, endAngle: Angle, clockwise: boolean): PathImpl
    addLine(p: Point): PathImpl
    addQuadCurve(p: Point, control: Point): PathImpl
    addCurve(p: Point, cp1: Point, cp2: Point): void
    closeSubpath(): void
}

class PathImpl extends Shape implements Path {

    private _commands = new Array<PathCommand>()

    protected readonly _path: PathSvg

    constructor(action: PathAction) {
        super(View.Context.path())
        this._path = this.element as PathSvg
        action(this)
        this.updatePath()
        // this._path.stroke({
        //     linecap: 'round',
        //     linejoin: 'round'
        // })
    }

    public move(p: Point): PathImpl {
        this._commands.push(Element(Command.move, p))
        return this
    }

    public addLine(p: Point): PathImpl {
        this._commands.push(Element(Command.lineTo, p))
        return this
    }

    public addQuadCurve(p: Point, control: Point): PathImpl {
        this._commands.push(Element(Command.quadCurve, p, control))
        return this
    }

    public addCurve(p: Point, cp1: Point, cp2: Point) {
        this._commands.push(Element(Command.curve, p, cp1, cp2))
        return this
    }

    public closeSubpath() {
        this._commands.push(Element(Command.closeSubpath))
        return this
    }

    // // There's a great article on bezier curves here:
    // // https://pomax.github.io/bezierinfo
    // // FIXME: Handle negative delta
    public addArc(
        center: Point,
        radius: number,
        startAngle: Angle,
        endAngle: Angle,
        clockwise: boolean) {

        if (clockwise) {

            const radians =
                endAngle.degrees
                + (degrees_to_radians(Math.PI * 2) - endAngle.degrees)
                + startAngle.degrees

            this.addArc(
                center,
                radius,
                endAngle,
                Angle({ radians: radians }),
                false
            )
        } else {
            let angle = Math.abs(startAngle.radians - endAngle.radians)
            if (angle > Math.PI / 2) {
                // Split the angle into 90° chunks
                let chunk1 = Angle({ radians: startAngle.radians + (Math.PI / 2) })
                this.addArc(
                    center,
                    radius,
                    startAngle,
                    chunk1,
                    clockwise)
                this.addArc(
                    center,
                    radius,
                    chunk1,
                    endAngle,
                    clockwise)
            } else {
                let startPoint = Point(radius + center.x, center.y)
                let endPoint = Point(
                    (radius * Math.cos(angle)) + center.x,
                    (radius * Math.sin(angle)) + center.y)
                let l = (4 / 3) * Math.tan(angle / 4)
                let c1 = Point(radius + center.x, (l * radius) + center.y)
                let c2 = Point(
                    ((Math.cos(angle) + l * Math.sin(angle)) * radius) + center.x,
                    ((Math.sin(angle) - l * Math.cos(angle)) * radius) + center.y)

                this.move(startPoint.rotate(startAngle, center))
                this.addCurve(
                    endPoint.rotate(startAngle, center),
                    c1.rotate(startAngle, center),
                    c2.rotate(startAngle, center)
                )
            }
        }
        return this
    }

    private updatePath() {

        var pathString = ''

        for (const command of this._commands) {

            switch (command.type) {
                case Command.move:
                    {
                        const pt = command.points[0]
                        pathString
                            += "M"
                            + pt.x.toString()
                            + ' '
                            + pt.y.toString()
                            + ' '
                        break
                    }

                case Command.lineTo:
                    {
                        const pt = command.points[0]
                        pathString
                            += "L"
                            + pt.x.toString()
                            + ' '
                            + pt.y.toString()
                            + ' '
                        break
                    }

                case Command.quadCurve:
                    {
                        const pt = command.points[0]
                        const c1 = command.points[1]
                        pathString
                            += "Q"
                            + c1.x.toString()
                            + ' '
                            + c1.y.toString()
                            + ' '
                            + pt.x.toString()
                            + ' '
                            + pt.y.toString()
                            + ' '
                        break
                    }

                case Command.curve:
                    {
                        const pt = command.points[0]
                        const c1 = command.points[1]
                        const c2 = command.points[2]
                        pathString
                            += "C"
                            + c1.x.toString()
                            + ' '
                            + c1.y.toString()
                            + ' '
                            + c2.x.toString()
                            + ' '
                            + c2.y.toString()
                            + ' '
                            + pt.x.toString()
                            + ' '
                            + pt.y.toString()
                            + ' '
                        break
                    }

                case Command.closeSubpath:
                    pathString += "Z" + ' '
                    break
            }
        }

        if (pathString.length > 0) {
            this._path.plot(pathString)
        }
    }
}

export function Path(action: PathAction): PathImpl {
    return new PathImpl(action)
}

