/** Name:   BangJs.Sprites.AnimatedSprite.ts
 *  Desc:   Animated Sprite Base Logic
 *  Author: Jimy Houlbrook
 *  Date:   10/05/24
 */

import {AnimatedSprite, Texture} from 'pixi.js';
import { Entity } from '../Physics/entity';

export class AnimSprite extends AnimatedSprite{
    private _deltaFunctions: Array<CallableFunction>;

    protected _physicsEntity?: Entity;

    /** Animated Sprite, Does not move
     * 
     * @param x         X Position of Sprite
     * @param y         Y Position of Sprite
     * @param textures  Array of textures for animation
     * @param w         Width of Sprite
     * @param h         Height of Sprite
     */
    constructor(x: number = 0, y: number = 0, textures: Array<Texture>, w?: number, h?: number){
        super(textures);
        this.position.set(x, y);
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

    /** Remove function from Delta
     * 
     * @param fn function to be removed
     */
    protected removeFromDelta(fn: CallableFunction){
        const index: number = this._deltaFunctions.indexOf(fn);

        if(index <= -1) return;     // Not found

        this._deltaFunctions.splice(index, 1);
    }

    /** Function that runs every frame once added to Application Ticker */
    protected delta(ms){
        // Loop through array of functions and run them
        for(const fn of this._deltaFunctions){
            fn();
        }
    }

    /** Set Physics Entity
     * 
     *  Sets the Physics Entity of sprite
     *  and sprite of Physics Entity
     * 
     * @param e Physics Entity
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