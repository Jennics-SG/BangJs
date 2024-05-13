/** Name:   BangJs.Animations.Ts
 *  Desc:   All Logic for handling tweens using GSAP
 *  Author: Jimy Houlbrook
 *  Date:   12/05/24
 */

import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { StaticSprite } from './Sprites/staticSpite';
import { AnimSprite } from './Sprites/AnimatedSprite'; 

export interface Tween{
    action: string,                     // Tween function to be run:    to || from || fromTo
    sprite: StaticSprite | AnimSprite,  // Entity to be tweened
    options: { 
        [key: string]: [value: any]     // This is where args for the tween would go, x, y, rotation, etc...
    },
    duration: number,
}

export class Animator{
    constructor(){
        gsap.registerPlugin(PixiPlugin);
        PixiPlugin.registerPIXI(PIXI);
    }

    public addTween(tween: Tween){
        if(!tween) return;      // Missing tween
        
        const fn = this.getFn(tween.action);
        if(!fn) return;         // Failed to get function

        fn(tween.sprite, {
            ...tween.options, duration: tween.duration,
            onStart: ()=> tween.sprite.setPhysicsEnabled(false), 
            onComplete: tween.sprite.setPhysicsEnabled(true)
        });
    }
    
    /** Get GSAP Tween function from string
     * 
     * @param action    String correlating to function
     * @returns         Function to be called
     */
    private getFn(action: String): CallableFunction | null{
        let fn: CallableFunction | null = null;;

        switch(action){
            case "to" || "To" || "TO":
                fn = gsap.to;
                break;
            case "from" || "From" || "FROM":
                fn = gsap.from;
                break;
            case "fromTo" || "fromto" || "FromTo" || "FROMTO":
                fn = gsap.fromTo;
                break;
            default:
                // warn that this has defaulted
                console.warn('GSAP Function unrecognised \nBang.Animations.Animator.getFn')
                break;
        }

        return fn;
    }
}