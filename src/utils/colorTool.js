
export const getRgb = (color) => {
    const matches = /rgb\((\d+),\s?(\d+),\s?(\d+)\)/i.exec(color)
    const r = Number(matches?.[1] ?? 0);
    const g = Number(matches?.[2] ?? 0);
    const b = Number(matches?.[3] ?? 0);

    return { r, g, b };
}

export const parseColor = (color) => {
    let hex = ""
    let rgb = { r: 0, g: 0, b: 0 }
    let hsv = { h: 0, s: 0, v: 0 }

    if (color.slice(0, 1) === "#") {
        hex = color
        rgb = hexToRgb(hex)
        hsv = rgbToHsv(rgb)
    } else if (color.slice(0, 3) === "rgb") {
        rgb = getRgb(color)
        hex = rgbToHex(rgb)
        hsv = rgbToHsv(rgb)
    }

    return { hex, rgb, hsv }
}

export const getSaturationCoordinates = (color) => {
    const { s, v } = color.hsv
    const x = s
    const y = 100 - v

    return [x, y]
}

export const getHueCoordinates = (color) => {
    const { h } = color.hsv
    const x = (h / 360) * 100

    return x
}

export const clamp = (number, min, max) => {
    if (!max) return Math.max(number, min) === min ? number : min
    else if (Math.min(number, min) === number) return min
    else if (Math.max(number, max) === number) return max

    return number
}

export const rgbToHex = (color) => {
    var { r, g, b } = color
    var hexR = r.toString(16)
    var hexG = g.toString(16)
    var hexB = b.toString(16)

    if (hexR.length === 1) hexR = "0" + hexR
    if (hexG.length === 1) hexG = "0" + hexG
    if (hexB.length === 1) hexB = "0" + hexB

    return "#" + hexR + hexG + hexB;
}

export const hexToRgb = (color) => {
    let r = 0
    let g = 0
    let b = 0

    // 3 digits
    if (color.length === 4) {
        r = Number("0x" + color[1] + color[1])
        g = Number("0x" + color[2] + color[2])
        b = Number("0x" + color[3] + color[3])

        // 6 digits
    } else if (color.length === 7) {
        r = Number("0x" + color[1] + color[2])
        g = Number("0x" + color[3] + color[4])
        b = Number("0x" + color[5] + color[6])
    }

    return { r, g, b };
}

export const rgbToHsv = (color) => {
    let { r, g, b } = color;
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const d = max - Math.min(r, g, b);
    const h = d
        ? (max === r
            ? (g - b) / d + (g < b ? 6 : 0)
            : max === g
                ? 2 + (b - r) / d
                : 4 + (r - g) / d) * 60
        : 0;
    const s = max ? (d / max) * 100 : 0;
    const v = max * 100;

    return { h, s, v };
}

export const hsvToRgb = (color) => {
    let { h, s, v } = color;
    s /= 100;
    v /= 100;

    const i = ~~(h / 60);
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - s * f);
    const t = v * (1 - s * (1 - f));
    const index = i % 6;

    const r = Math.round([v, q, p, p, t, v][index] * 255);
    const g = Math.round([t, v, v, q, p, p][index] * 255);
    const b = Math.round([p, p, t, v, v, q][index] * 255);

    return { r, g, b };
}
