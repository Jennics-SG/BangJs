/** Name:   BangJs.Animations.Ts
 *  Desc:   All Logic for handling tweens using GSAP
 *  Author: Jimy Houlbrook
 *  Date:   12/05/24
 */

import { Sprite } from 'pixi.js';

export interface Tween{
    action: string,                     // Tween function to be run:    to || from || fromTo
    entity: HTMLBodyElement | Sprite,   // Entity to be tweened
    options: { 
        [key: string]: [value: any]     // This is where args for the tween would go, x, y, rotation, etc...
    }
}