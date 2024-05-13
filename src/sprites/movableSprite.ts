/** Name:   BangJs.Sprites.MovableSprite.ts
 *  Desc:   Sprite that can be moved with certain keys
 *  Author: Jimy Houlbrook
 *  Date:   28/04/24
 */

import { AnimSprite } from "./AnimatedSprite";
import { StaticSprite } from "./staticSpite";
import {Texture } from "pixi.js"

// Controls n that
interface Controls{
    [key : string]: boolean
}

export class MovableSprite extends StaticSprite{
    private _controls: Controls;
    public enabled: boolean
    
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

        this.enabled = true;

        // Control logic Listeners
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    // Fired when key pressed
    private onKeyDown(e: KeyboardEvent): void{
        if(!this.enabled) return;
        this._controls[e.code] = true;
    }

    // Fired when key goes up
    private onKeyUp(e: KeyboardEvent): void{
        if(!this.enabled) return;
        this._controls[e.code] = false;
    }
}

export class AnimatedMovableSprite extends AnimSprite{
    private _controls: Controls;

    public enabled: boolean;

    /** Animated Sprite that sets a control to true when its pressed down
     * 
     * @param x         X Position 
     * @param y         Y Position
     * @param textures  Array of textures for animation
     * @param controls  Controls
     * @param w         Width
     * @param h         Height
     */
    constructor(x: number = 0, y: number = 0, textures: Array<Texture>, controls: Controls, w?: number, h?: number){
        super(x, y, textures);
        this.position.set(x, y);
        if(w) this.width = w;
        if(h) this.height = h;
        
        this._controls = controls;

        this.enabled = true;

        // Control logic listeners
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    // Fired when key pressed
    private onKeyDown(e: KeyboardEvent): void{
        if(!this.enabled) return;
        this._controls[e.code] = true;
    }

    // Fired when key goes up
    private onKeyUp(e: KeyboardEvent): void{
        if(!this.enabled) return;
        this._controls[e.code] = false;
    }
}