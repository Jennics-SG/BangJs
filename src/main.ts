/** name:   BangJs.Main.ts
 *  Desc:   Main file for BangJs Game Engine
 *  Auth:   Jimy Houlbrook
 *  Date:   27/04/24
 */

import { App, ApplicationArgs } from "./application"

class Application{
    constructor(args: ApplicationArgs){
        new App(args);
    }
};

class myClass{
    constructor(){
        console.log('help')
    }
};

module.exports = {
    Application: Application,
    myClass: myClass
}