/** Name:   BangJs.Sprites.index.ts
 *  Desc:   Index file for all sprite classes
 *  Author: Jimy Houlbrook
 *  Date:   28/04/24
 */

import { StaticSprite } from "./staticSpite";
import { DragableSprite } from "./dragableSprite";
import { MovableSprite } from "./movableSprite";

const Sprites = {
    StaticSprite: StaticSprite,
    DragableSprite: DragableSprite,
    MovableSprite: MovableSprite
}

module.exports = Sprites;