/** Name:   BangJs.Application.ts
 *  Desc:   File holding the application logic for the Engine
 *  Author: Jimy Houlbrook
 *  Date:   27/04/24
 */

import {Application, TickerCallback} from 'pixi.js'
import { Layer } from './Physics/layer';
import { Engine } from './Physics/engine'
import { FPSDisplay } from './utils';

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
    optional?: OptionalArgs,
}

/** Optional Application Arguments
 * 
 *  hello: console.log engine ver
 * 
 *  background: background colour
 * 
 *  antialias: antialians true / false
 */
interface OptionalArgs{
    hello?: boolean,
    debug?: boolean,
    background?: string,
    antialias?: boolean,
    physics?: boolean,
    fullscreen?: FSOptions
}

/** Fullscreen options
 * 
 *  enabled: Is fullscreen enabled
 * 
 *  debug: emit warning messages for debug purposes, default false
 */
interface FSOptions{
    enabled: boolean,
}

// Class representing Application
export class App extends Application{
    private _args: ApplicationArgs;

    // Physics stuff
    // Not set unless user wants physics
    private _physicsLayers?: Array<Layer>

    // Put this here incase people want to
    // store the engine
    public engine?: Engine;

    private readonly _ver: string = "0.0.2";

    constructor(args: ApplicationArgs){  
        super();
        
        this._args = args;

        if(this._args.optional?.debug){
            const fps = FPSDisplay.instance
            fps.create(this);
        }

        if(this._args.optional?.physics)
            this._physicsLayers = new Array();

        //this._init();
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

        this.ticker.add(this.delta.bind(this));
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
        if(this._args.optional?.debug){
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
        V: ${this._ver}`);
    }

    /** Add Child to application stage
     * 
     *  Best used with a container that holds other child elements
     * 
     * @param child Child to be added
     */
    public addChild(child: any): void{
        this.stage.addChild(child)
    }

    // Add function too ticker
    public addToTicker(fn: TickerCallback<CallableFunction>, context: CallableFunction){
        this.ticker.add(fn, context);
    }

    // Remove function from ticker
    public removeFromTicker(fn: TickerCallback<CallableFunction>, context: CallableFunction){
        this.ticker.remove(fn, context);
    }

    public getWidthHeight(): Object{
        const w = this._args.width;
        const h = this._args.height;
        return {w, h}
    }

    public addPhysicsLayer(layer: Layer){
        // add a debug message here
        if(!this._physicsLayers) return;

        this.ticker.add(() => {
            layer.step(this.ticker.deltaMS)
        }, this);

        this._physicsLayers.push(layer);
    }

    private delta(){
        this.redrawEntities();
    }

    private redrawEntities(){
        if(!this._args.optional?.physics || !this.engine) return;
        // Redraw entities according to physics x,y if physics enabled
        //console.log(this._physicsLayers);
    }
}