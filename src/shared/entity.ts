/** Name:   BangJs.shared.Entity.ts
 *  Desc:   Parent for Graphics & Sprites
 *  Author: Jimy Houlbrook
 *  Date:   28/04/24
 */

import { Point } from "pixi.js";

export default class Entity{
    public position: Point;
    public width: number;
    public height: number;

    constructor(x: number, y: number, w: number, h: number){
        this.position = new Point(x, y);
        this.width = w;
        this.height = h;
    }
}