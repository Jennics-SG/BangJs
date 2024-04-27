/** name:   BangJs.Main.ts
 *  Desc:   Main file for BangJs Game Engine
 *  Auth:   Jimy Houlbrook
 *  Date:   27/04/24
 */

import { App, ApplicationArgs } from "./application"

export class Application{
    constructor(args: ApplicationArgs){
        const _app = new App(args);
    }
}

module.exports = Application;