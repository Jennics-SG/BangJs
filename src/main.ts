/** name:   BangJs.Main.ts
 *  Desc:   Main file for BangJs Game Engine
 *  Auth:   Jimy Houlbrook
 *  Date:   27/04/24
 */

import { App } from "./application"
import { GraphicsExtended } from "./graphics"
import * as Sprites from "./sprites/index";

import { Assets } from "pixi.js";

const Bang = {
    Application: App, 
    Graphics: GraphicsExtended,
    Assets: Assets,
    Sprites: Sprites
}

module.exports = Bang;