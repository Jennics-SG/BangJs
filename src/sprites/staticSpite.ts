/** Name:   BangJs.StaticSprite.ts
 *  Desc:   Sprite that isnt animated
 *  Author: Jimy Houlbrook
 *  Date:   28/04/24
 */

import { Sprite, Texture } from "pixi.js";
import { Entity } from "../Physics/entity";

export class StaticSprite extends Sprite{ 
    private _deltaFunctions: Array<CallableFunction>

    protected _physicsEntity?: Entity
    
    /** Static Sprite, doesnt move or change
     * 
     * @param x         X position of Sprite
     * @param y         Y Position of Sprite
     * @param texture   Texture of Sprite
     * @param w         Optional - Width
     * @param h         Optional - Height
     */
    constructor(x: number = 0, y: number = 0, texture: Texture,  w?: number, h?: number,){
        super(texture);
        this.position.set(x, y);
        //console.log(x, y);
        if(w) this.width = w;
        if(h) this.height = h;
        this._anchor.set(0.5);
        
        this._deltaFunctions = new Array();
    }

    /** Add function to Delta
     * 
     * @param fn Function
     */
    protected addToDelta(fn: CallableFunction){
        this._deltaFunctions.push(fn);
    }

    /** Remove Function from Delta
     * 
     * @param fn function to be removed
     */
    protected removeFromDelta(fn: CallableFunction){
        const index: number = this._deltaFunctions.indexOf(fn);
        
        if(index <= -1) return;     // Not found

        this._deltaFunctions.splice(index, 1);
    }

    /** Function that runs every frame once added to Application Ticker */
    protected delta(){
        // Loop through array of functions and run them
        for (const fn of this._deltaFunctions) {
            fn()
        }
    }

    /** Set Physics Entity
     * 
     *  Sets the Physics Entity of sprite
     *  and sprite of Physics Entity
     * 
     * @param e Physics entity
     */
    public setPhysicsEntity(e: Entity){
        this._physicsEntity = e;
        e.sprite = this;
    }

    /** Set Physics Enabled
     * 
     * @param b     True / False
     */
    public setPhysicsEnabled(b: boolean){
        if(!this._physicsEntity) return;
        this._physicsEntity.enabled = b;
    }
}