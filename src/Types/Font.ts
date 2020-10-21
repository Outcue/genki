
export class Font {

  static readonly DefaultSize = 12.0

  constructor(
    public size = Font.DefaultSize,
    public design = Font.Design.default,
    public weight: number,
    public smallCaps: boolean,
    public italic: boolean,
    public bold: boolean,
    public monospaceDigits: boolean,
    public leading: Font.Leading) {
  }

  family(): string {

    switch (this.design) {

      case Font.Design.monospaced:
        return "Consolas, \
                        'Andale Mono WT' \
                        'Andale Mono', \
                        'Lucida Console', \
                        'Lucida Sans Typewriter', \
                        'DejaVu Sans Mono', \
                        'Bitstream Vera Sans Mono', \
                        'Liberation Mono', \
                        'Nimbus Mono L', \
                        Monaco, \
                        'Courier New', \
                        Courier, \
                        monospace"

      // case Font.Design.rounded: // Not supported due to browsers not having a rounded font builtin
      //     return Self.default.description

      case Font.Design.serif:
        return "Cambria, \
                        'Hoefler Text',\
                        Utopia,\
                        'Liberation Serif',\
                        'Nimbus Roman No9 L Regular',\
                        Times,\
                        'Times New Roman',\
                        serif"

      case Font.Design.default:
      default:
        return "system, \
                        -apple-system, \
                        '.SFNSText - Regular', \
                        'San Francisco', \
                        'Roboto', \
                        'Segoe UI', \
                        'Helvetica Neue', \
                        'Lucida Grande', \
                        sans-serif"
    }
  }

  static system(
    size: number = Font.DefaultSize,
    weight: Font.Weight = Font.Weight.regular,
    design: Font.Design = Font.Design.default): Font {
    return new Font(
      size,
      design,
      weight,
      false,
      false,
      false,
      false,
      Font.Leading.standard
    )
  }

  static italic(
    size: number = Font.DefaultSize,
    weight: Font.Weight = Font.Weight.regular,
    design: Font.Design = Font.Design.default): Font {
    return new Font(
      size,
      design,
      weight,
      false,
      true,
      false,
      false,
      Font.Leading.standard
    )
  }

  static smallCaps(
    size: number = Font.DefaultSize,
    weight: Font.Weight = Font.Weight.regular,
    design: Font.Design = Font.Design.default): Font {
    return new Font(
      size,
      design,
      weight,
      true,
      false,
      false,
      false,
      Font.Leading.standard
    )
  }
}

export namespace Font {

  export const enum Design {
    default,
    serif,
    rounded,
    monospaced
  }

  export const enum Leading {
    standard,
    tight,
    loose
  }

  export const enum Weight {
    ultralight = 100,
    ultraLight = 100,
    thin = 200,
    light = 300,
    regular = 400,
    medium = 500,
    semibold = 600,
    bold = 700,
    heavy = 800,
    black = 900
  }
}

/*
  extension Font.Leading: CustomStringConvertible {
    public var description: string {
      switch self {
      case .standard:
        return "normal"
      case .loose:
        return "1.5"
      case .tight:
        return "0.5"
      }
    }
  }

  extension Font: StylesConvertible {
    public var styles: [string: string] {
      [
        "font-family": _name == _FontNames.system.rawValue ? _design.description : _name,
        "font-weight": "\(_bold ? Font.Weight.bold.value : _weight.value)",
        "font-style": _italic ? "italic" : "normal",
        "font-size": "\(_size)",
        "line-height": _leading.description,
        "font-variant": _smallCaps ? "small-caps" : "normal",
      ]
    }
  }
*/

