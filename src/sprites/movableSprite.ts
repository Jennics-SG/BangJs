/** Name:   BangJs.Sprites.MovableSprite.ts
 *  Desc:   Sprite that can be moved with certain keys
 *  Author: Jimy Houlbrook
 *  Date:   28/04/24
 */

import { StaticSprite } from "./staticSpite";
import {Texture } from "pixi.js"

export interface Controls{
    [key : string]: boolean
}

export class MovableSprite extends StaticSprite{
    private _controls: Controls;
    
    /** Sprite that sets a control to true when its pressed down
     * 
     * @param x         X Position 
     * @param y         Y Position
     * @param texture   Texture
     * @param controls  Controls
     * @param w         Width
     * @param h         Height
     */
    constructor(x: number = 0, y: number = 0, texture: Texture, controls: Controls, w?: number, h?: number){
        super(x, y, texture);
        this.position.set(x, y);
        if(w) this.width = w;
        if(h) this.height = h;

        this._controls = controls;

        // Control logic Listeners
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    private onKeyDown(e: KeyboardEvent): void{
        this._controls[e.code] = true;
    }

    private onKeyUp(e: KeyboardEvent): void{
        this._controls[e.code] = false;
    }
}