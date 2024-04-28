/** Name:   BangJs.Graphics.ts
 *  Desc:   Object that can draw graphics onto a container that can be added
 *          too the app stage
 *  Author: Jimy Houlbrook
 *  Date:   28/04/24
 */

import Entity from "./shared/entity";
import { Graphics, Container } from "pixi.js";

export class GraphicsExtended extends Entity{
    private _cursor: Graphics      // PIXI Graphics entity
    
    public container: Container   // Container to hold graphics

    /** Graphics Entity that can be used to draw onto a container
     * 
     * @param x X position of entity
     * @param y Y position of entity
     * @param w Width of container,
     * @param h Height of container, optional
     */
    constructor(x: number, y: number, w: number, h?: number){
        super(x, y, w, h? h : w);

        // Create cursor
        this._cursor = new Graphics();

        // Create container
        this.container = new Container();
        this.container.width = w;
        this.container.height? h : w;
        this.container.position.set(x, y);
        this.container.addChild(this._cursor);
    }

    // METHODS ----------------------------------------------------------------
    
    /** Draw a shape to the container
     * 
     * @param shape Shape to be drawn (Currently only supports Circle)
     * @param x     X position relative to container
     * @param y     Y position relative to continaer
     * @param w     Width of drawing, or radius if circle
     * @param h     Height of drawing, optional
     * 
     * @returns void
     */
    public draw(shape: string, x: number, y: number, w: number, colour: string, h?: number): void{
        switch(shape){
            case "circle":
                this.drawCircle(x, y, w, colour);
                break;
            default:
                console.error(`Shape Unkown\nBangJs.Graphics.draw`)
                return;
        }
        return;
    }

    private drawCircle(x: number, y: number, r: number, colour: string){
        this._cursor.circle(x, y, r);
        this._cursor.fill(colour);
    }

    // Clear graphics entity
    public clear(): void{
        this._cursor.clear();
    }

    // Resize container
    public resize(w: number, h: number): void{
        this.width = w;
        this.height = h;
        this.container.width = w;
        this.container.height = h;
    }

    // SETTERS ----------------------------------------------------------------

    // Set Position
    public setPosition(x: number, y: number): void{
        this.position.set(x, y);
        this.container.position.set(x, y);
    }   
}