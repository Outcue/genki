# Genki

## A framework for building web applications influenced by SwiftUI

Genki is a library for creating declarative user interfaces. Genki is heavily influenced by SwiftUI and maps to the SwiftUI API as closely as possible. 

Genki is written in Typescript and is not able to duplicate some SwiftUI API that depend on features of the Swift language. In these cases, Typescript
idioms are used. 

There are few runtime dependencies; [Mobx](https://mobx.js.org/README.html), [SVG.js](https://svgjs.com/docs/3.0/) and [Yoga Layout](https://yogalayout.com). 

Development is done using [Typescript](https://www.typescriptlang.org) and testing is done using [Mocha](https://mochajs.org) and [Chai](https://www.chaijs.com).

Genki hides the details of HTML and CSS. There is no need for language extensions such as JSX or additional pre-processors. Code is written in Typescript.


## Example Code
```
class ButtonDemoBuilder implements ViewBuilder {

    private readonly borderColor = State(Color.red)
    private readonly borderWidth = State(1.0)
    private readonly fillColor = State(Color.green)

    private toggle = false

    public body(): AnyView {
        return HStack(
            Button("Toggle Color", (button: AnyView) => {
                withAnimation({
                    view: button,
                    animation: Animation.easeInOut()
                }, () => {

                    if (this.toggle) {
                        this.borderColor.set(Color.red)
                        this.borderWidth.set(6.0)
                        this.fillColor.set(Color.green)
                    } else {
                        this.borderColor.set(Color.green)
                        this.borderWidth.set(1.0)
                        this.fillColor.set(Color.red)
                    }
                    this.toggle = !this.toggle
                })
            })
                .background(this.fillColor)
                .cornerRadius(5.0)
                .frame({ width: 100, height: 50 })
                .shadow({ radius: 3, x: 2, y: 2 })
                .border(this.borderColor, this.borderWidth)
        )
            .spacing(30)
    }
}

export default function ButtonDemo(): ViewBuilder {
    return new ButtonDemoBuilder()
}
```

### Getting Started

```
git clone https://github.com/Outcue/genki
cd genki
yarn install
parcel src/Demos/demo.html
```

Open http://127.0.0.1:1234/ in your browser to see the demo application.
