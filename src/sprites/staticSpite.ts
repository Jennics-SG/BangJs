/** Name:   BangJs.StaticSprite.ts
 *  Desc:   Sprite that isnt animated
 *  Author: Jimy Houlbrook
 *  Date:   28/04/24
 */

import { Sprite, Texture } from "pixi.js";

export class StaticSprite extends Sprite{ 
    private _deltaFunctions: Array<CallableFunction>
    
    constructor(x: number = 0, y: number = 0, texture: Texture,  w?: number, h?: number,){
        super(texture);
        this.position.set(x, y);
        if(w) this.width = w;
        if(h) this.height = h;
        
        this._deltaFunctions = new Array();
    }

    protected addToDelta(fn: CallableFunction){
        this._deltaFunctions.push(fn);
    }

    protected removeFromDelta(fn: CallableFunction){
        const index: number = this._deltaFunctions.indexOf(fn);
        
        // Not found
        if(index < -1) return;

        this._deltaFunctions.splice(index, 1);
    }

    // Function that runs every frame
    // Needs to be added to application ticker
    protected delta(){
        // There needs to be a way to add functions to an array
        // THis function will then loop over that array and execute the functions
        for (const fn of this._deltaFunctions) {
            fn()
        }
    }
}