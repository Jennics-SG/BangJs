/** Name:   BangJs.Physics.Engine
 *  Desc:   TBH im not 100% sure yet but its gonna basically be an accessor
 *          class for Box2D
 *  Author: Jimy Houlbrook
 *  Date:   30/04/24
 */

import B2D from '../B2D/Box2D_v2.3.1_min';
import { Vector } from '../utils';

/** Get Box2D instance */
export async function getB2D(){
    return new Promise((res, rej) => {
        B2D().then(box => {
            res(box);
        })
    });
}

/** Class that literally just gets instance of Box2D
 * 
 *  I wanted to do it in a way that only needs one call to get the physics
 *  engine directly, the best way forward was to create a "static" class
 *  that is initiated with Physics to download the engine and make it
 *  accessible
 * 
 *  Im a bit confused how this is all gonna work
 */
export class Engine{
    public static yFlipIndicator: number = -1;
    public b2d;             // Box 2D Instance

    private _w: number;     // Width of application
    private _h: number;     // Height of application
    
    private _transX: number; // Translation X for World to pixels
    private _transY: number; // Translation Y for World to pixels
    private _yFlip: number;  // Does y need to be flipped?

    private _scale: number;  // Scale of pixel to meter

    constructor(w: number, h: number, scale: number = 1){
        this._w = w;
        this._h = h;
        console.log(scale);
        this._scale = scale;
        
        this._transX = w / 2 + Number.EPSILON;
        this._transY = h / 2 + Number.EPSILON;
        this._yFlip = Engine.yFlipIndicator;
    }

    // Get b2d instance
    async init(){
        this.b2d = await getB2D();
    }

    /** Convert Pixel coordinates to World Coordinates
     * 
     * @param x     Pixel X
     * @param y     Pixel Y
     * @returns     Vector
     */
    public coOrdPixelToWorld(x: number, y: number): Vector{
        let worldX: number = 
            this.mapNumRange(x, this._transX, this._transX+this._scale, 0, 1);
        let worldY: number = y;

        if(this._yFlip === Engine.yFlipIndicator)
            worldY = this.mapNumRange(y, this._h, 0, 0, this._h);
            
        const v = new this.b2d.b2Vec2(worldX, worldY);
        return v;
    }

    /** Convert World Coordinates to Pixel Coordinates
     * 
     * @param x     World X
     * @param y     World Y
     * @returns     Vector
     */
    public coOrdWorldToPixel(x: number, y: number): Vector{
        let pixelX = this.mapNumRange(x, 0, 1, this._transX, this._transX+this._scale);
        let pixelY = this.mapNumRange(y, 0, 1, this._transY, this._transY+this._scale);
        if(this._yFlip === Engine.yFlipIndicator)
            pixelY = this.mapNumRange(y,0,this._h,this._h,0)
        return new Vector(pixelX, pixelY);
    }

    /** Convert Pixel measurement to World
     * 
     * @param n     Number to convert
     * @returns     Number
     */
    public scalarPixelsToWorld(n: number): number{
        return n / this._scale
    }

    /** Convert World measurement to Pixel
     * 
     * @param n     Number to convert
     * @returns     Number
     */
    public scalarWorldToPixels(n: number): number{
        return n * this._scale;
    }

    /** Map number from one range to another   
     * 
     * @param n         Number
     * @param inMin     Minimum of current range
     * @param inMax     Maxiumum of current range
     * @param outMin    Minimum of new range
     * @param outMax    Maxiumum of new range
     * @returns 
     */
    private mapNumRange(n: number, inMin: number, inMax: number, outMin: number, outMax: number): number{
        return outMin + (outMax - outMin)*((n - inMin)/(inMax - inMin))
    }
}
