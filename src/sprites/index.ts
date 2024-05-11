/** Name:   BangJs.Sprites.index.ts
 *  Desc:   Index file for all sprite classes
 *  Author: Jimy Houlbrook
 *  Date:   28/04/24
 */

import { StaticSprite } from "./staticSpite";
import { DragableSprite, AnimatedDragableSprite } from "./dragableSprite";
import { MovableSprite, AnimatedMovableSprite } from "./movableSprite";
import { AnimSprite } from "./AnimatedSprite";

const Sprites = {
    StaticSprite,
    DragableSprite,
    MovableSprite,
    AnimatedSprite: AnimSprite,
    AnimatedDragableSprite,
    AnimatedMovableSprite
}

module.exports = Sprites;