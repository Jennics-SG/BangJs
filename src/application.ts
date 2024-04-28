/** Name:   BangJs.Application.ts
 *  Desc:   File holding the application logic for the Engine
 *  Author: Jimy Houlbrook
 *  Date:   27/04/24
 */

import {Application} from 'pixi.js'

/** Application Arguments
 * 
 *  height: Height of application
 * 
 *  width: Width of application
 * 
 *  View: Canvas element for Application
 * 
 *  Optional: Optional arguments
 */
export interface ApplicationArgs{
    height: number,
    width: number,
    canvas: HTMLCanvasElement,
    optional?: {
        /** Optional Arguments
         *  hello: console.log engine ver
         *  background: background colour
         *  antialias: antialians true / false
         */
        hello?: boolean,
        background?: string,
        antialias?: boolean, 
        fullscreen?: FSOptions
    }
}

/** Fullscreen options
 * 
 *  enabled: Is fullscreen enabled
 * 
 *  debug: emit warning messages for debug purposes, default false
 */
interface FSOptions{
    enabled: boolean,
    debug?: boolean
}

// Class representing Application
export class App extends Application{
    private _args: ApplicationArgs;
    
    constructor(args: ApplicationArgs){  
        super();
        
        this._args = args;

        this._init();
    }

    // METHODS ----------------------------------------------------------------
    
    // Initialise application
    private async _init(): Promise<void>{
        await super.init({
            width: this._args.width,
            height: this._args.height,
            canvas: this._args.canvas,
            antialias: this._args.optional?.antialias,
            background: this._args.optional?.background,
        });

        // Run hello if true
        if(this._args.optional?.hello) this.hello();

        // Set to fullscreen if true
        // I could've done it through application args but in my experience
        // Setting it like that is bad, and I wanted to make it a bit easier
        // to deal with, plus have the debug message
        if(this._args.optional?.fullscreen?.enabled)
            this.enableFullScreen(this._args.optional?.fullscreen);
    }

    /** Enable Full Screen with auto resizing
     * 
     * @FSOptions fsOps -- Fullscreen Options  
     * @returns void
     */
    private enableFullScreen(fsOps: FSOptions): void{
        // Double check that fullscreen is enabled just to be safe
        if(fsOps === undefined || !fsOps.enabled) return;

        // Warn about scroll bars if debug
        // if debug warn that css can cause scrollbars to appear
        if(fsOps.debug){
            const warning: string = `WARNING: CSS can cause Scrollbars, ensure Body and Canvas have "overflow: hidden;" for fullscreen\nBangJs.application.ts.app.enableFullScreen`
            console.warn(warning)
        };

        // Set resize
        this.resizeTo = window;

        // I want it to be known originally I wanted to have the option to not auto resize
        // But PIXI said no, this is the first time I have disagreed with PIXI.
    }

    // Print to console when application intialised to check it's running
    private hello(): void{
        console.log(`
        #  .______        ___      .__   __.   _______        __       _______.
        #  |   _  \\      /   \\     |  \\ |  |  /  _____|      |  |     /       |
        #  |  |_)  |    /  ^  \\    |   \\|  | |  |  __        |  |    |   (----\`
        #  |   _  <    /  /_\\  \\   |  . \`  | |  | |_ | .--.  |  |     \\   \\    
        #  |  |_)  |  /  _____  \\  |  |\\   | |  |__| | |  \`--'  | .----)   |   
        #  |______/  /__/     \\__\\ |__| \\__|  \\______|  \\______/  |_______/    
        #
        V: 0.0.11`)
    }

    /** Add Child to application stage
     * 
     *  Best used with a container that holds other child elements
     * 
     * @param child Child to be added
     */
    public addChild(child: any): void{
        console.log(this.stage.children);
        this.stage.addChild(child)
        console.log(this.stage.children);
    }
}