/** name:   BangJs.Main.ts
 *  Desc:   Main file for BangJs Game Engine
 *  Auth:   Jimy Houlbrook
 *  Date:   27/04/24
 */

import { App } from "./application"
import { GraphicsExtended } from "./graphics"
import * as Sprites from "./Sprites/index";
import * as Physics from "./Physics/index";
import { Assets } from "pixi.js";
import { Entity } from "./physics";

const Bang = {
    Application: App, 
    Graphics: GraphicsExtended,
    Assets,
    Sprites,
    Physics,
    Entity
}

module.exports = Bang;