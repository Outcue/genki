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

export class Router {

    private interval = 50
    private current: string

    routes = new Map
    root = "/"

    constructor() {
        window.addEventListener("load", () => {
            this.listen()
            setTimeout(() => {
                this.routeCheck()
            }, 1)
        })
    }

    add(path: string, cb: any) {
        this.routes.set(path, cb)
    }

    private clearSlashes(path: string): string {
        return path
            .toString()
            .replace(/\/$/, "")
            .replace(/^\//, "")
    }

    getCurrentPath(): string {
        let fragment = decodeURI(window.location.pathname + window.location.search)
        fragment = fragment.replace(/\?(.*)$/, "")
        return fragment
    }

    navigate(path: string) {
        window.history.pushState(
            null,
            null,
            this.root + this.clearSlashes(path))
        setTimeout(() => {
            this.routeCheck()
        }, 1)
    }

    isExternal(path: string): boolean {
        return path.indexOf(window.location.origin) != 0
    }

    private listen() {
        setInterval(this.routeCheck.bind(this), this.interval)
    }

    private routeCheck(): boolean {
        let curPath = this.getCurrentPath()
        if (this.current === curPath) {
            return true
        }
        this.current = curPath

        if (this.routes.has(this.current)) {
            const callback = this.routes.get(this.current).cb
            callback.call(null, true)
            return true
        }
        return false
    }
}

// export class PageRoute {

//     private firstTime = false

//     constructor(private router: Router, private route: string) {
//         this.router.add(route, match => {
//             currentPageRoute = this;
//             this.match = match;
//             if (this.onInit && !this.firstTime) {
//                 spawn(this.onInit.bind(this));
//                 this.firstTime = true;
//             }
//             if (this.onLoad) {
//                 spawn(this.onLoad.bind(this));
//             }
//             if (this.onRender) {
//                 spawn(this.onRender.bind(this));
//             }
//         });
//     }
// }

// let currentPageRoute = null;

// export class PageRoute {
//     constructor(route) {
//         this.firstTime = false;
//         this.router = router;
//         this.router.add(route, match => {
//             currentPageRoute = this;
//             this.match = match;
//             if (this.onInit && !this.firstTime) {
//                 spawn(this.onInit.bind(this));
//                 this.firstTime = true;
//             }
//             if (this.onLoad) {
//                 spawn(this.onLoad.bind(this));
//             }
//             if (this.onRender) {
//                 spawn(this.onRender.bind(this));
//             }
//         });
//     }

//     renderCurrentPage() {
//         if (currentPageRoute && currentPageRoute.onRender) {
//             currentPageRoute.onRender();
//         }
//     }

//     navigate(path) {
//         router.navigate(path);
//     }
// }

// export function register(routes) {
//     for (var i in routes) {
//         new routes[i]();
//     }
// }

// function spawn(f) {
//     f().then(() => {
//         //executed
//     });
// }

