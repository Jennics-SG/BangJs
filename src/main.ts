/** name:   BangJs.Main.ts
 *  Desc:   Main file for BangJs Game Engine
 *  Auth:   Jimy Houlbrook
 *  Date:   27/04/24
 */

import { App } from "./application"
import { GraphicsExtended } from "./graphics"

const Bang = {
    Application: App,
    Graphics: GraphicsExtended
}

module.exports = Bang;