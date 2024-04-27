/** Name:   BangJs.Application.ts
 *  Desc:   File holding the application logic for the Engine
 *  Author: Jimy Houlbrook
 *  Date:   27/04/24
 */

import {Application} from 'pixi.js'


export interface ApplicationArgs{
    /** Application Arguments
     *  height: Height of application
     *  width: Width of application
     *  View: Canvas element for Application
     *  Optional: Optional arguments
     */
    height: number,
    width: number,
    view: HTMLCanvasElement,
    optional?: {
        /** Optional Arguments
         *  hello: console.log engine ver
         *  background: background colour
         *  antialias: antialians true / false
         */
        hello?: boolean,
        background?: string,
        antialias?: boolean 
    }
}

// Class representing Application
export class App extends Application{
    private _args: ApplicationArgs;
    
    constructor(args: ApplicationArgs){
        super();    
        
        this._args = args;

        this._init()
    }

    // Initialise application
    private async _init(){
        await super.init({
            width: this._args.width,
            height: this._args.height,
            antialias: this._args.optional?.antialias,
            background: this._args.optional?.background
        });
    }
}