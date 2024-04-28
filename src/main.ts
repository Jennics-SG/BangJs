/** name:   BangJs.Main.ts
 *  Desc:   Main file for BangJs Game Engine
 *  Auth:   Jimy Houlbrook
 *  Date:   27/04/24
 */

import { App, ApplicationArgs } from "./application"

class myClass{
    constructor(){
        console.log('help')
    }
};

module.exports = {
    Application: App,
    myClass: myClass
}