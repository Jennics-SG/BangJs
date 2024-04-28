/** Name:   BangJs.StaticSprite.ts
 *  Desc:   Sprite that isnt animated
 *  Author: Jimy Houlbrook
 *  Date:   28/04/24
 */

import { Sprite, Texture } from "pixi.js";

export class StaticSprite extends Sprite{
    
    constructor(x: number = 0, y: number = 0, texture: Texture,  w?: number, h?: number,){
        super(texture);
        this.position.set(x, y);
        if(w) this.width = w;
        if(h) this.height = h;
    }
}