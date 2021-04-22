class Color
{
    private internalColorRGBA: Uint8ClampedArray;
    static hexMatchRegex = /#([0-9a-z]{2})([0-9a-z]{2})([0-9a-z]{2})/i;
    static colorMap: Map<string, Color> = new Map();
    normalizationMap: Map<Uint8ClampedArray, Float32Array> = new Map();
    constructor(red: number, green: number, blue: number, alpha: number)
    {
        this.internalColorRGBA = new Uint8ClampedArray([red, green, blue, alpha]);
    }


    public rgb()
    {
        return [this.internalColorRGBA[0], this.internalColorRGBA[1], this.internalColorRGBA[2]]
    }
    public rgba()
    {
        return this.internalColorRGBA;
    }
    public normalized()
    {
        const rgba = this.normalizationMap.get(this.internalColorRGBA);
        if (!rgba) {

            const calculated = new Float32Array([this.internalColorRGBA[0] / 255, this.internalColorRGBA[1] / 255, this.internalColorRGBA[2] / 255, this.internalColorRGBA[3] / 255])
            this.normalizationMap.set(this.internalColorRGBA, calculated);
            return calculated;
        }
        return rgba;
        // return new Float32Array([this.internalColorRGBA[0] / 255, this.internalColorRGBA[1] / 255, this.internalColorRGBA[2] / 255, this.internalColorRGBA[3] / 255])
    }

    static fromHex(hex: string)
    {
        // #eb4034
        const color = Color.colorMap.get(hex);
        if (color !== undefined) {
            return color;
        }
        let match = hex.match(this.hexMatchRegex);

        if (!match) {
            throw new Error(`Color error: ${hex} is not a valid hex string`);
        } else {
            let [, r, g, b] = match;
            const color = new Color(
                parseInt(r, 16),
                parseInt(g, 16),
                parseInt(b, 16),
                255
            );

            this.colorMap.set(hex, color);
            return color;
        }
    }

    static Black = new Color(0, 0, 0, 255);
    static White = new Color(255, 255, 255, 255);
    static Red = new Color(255, 0, 0, 255);
    static Green = new Color(0, 255, 0, 255);
    static Blue = new Color(0, 0, 255, 255);
    static Yellow = new Color(255, 255, 0, 255);
    static Magenta = new Color(255, 0, 255, 255);
    static Teal = new Color(0, 255, 255, 255);
}


export default Color;