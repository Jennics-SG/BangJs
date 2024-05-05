import * as PIXI from 'pixi.js';

/*
    * Singleton class for displaying FPS information
    * for a PIXI.js application.
    * 
    * It creates an HTML P Element and adds it to the DOM.
    * 
    * It intervals every 500 milliseconds by default. That
    * can be changed with the last parameter of the `create`
    * method.
    * 
    * The text colour, default string, font and text style
    * can all be changed with the constant vars at the top.
    * 
    * Don't forget to call the `destroy` method after use.
    * This will stop the interval calls and hopefully
    * free up some memory.
    * 
    * Author: Brick
*/
export class FPSDisplay {
    public static readonly FPS_TAG: string = 'FPS';
    public static readonly DEFAULT_FPS_STRING: string = `N/A ${FPSDisplay.FPS_TAG}`;
    public static readonly FONT: string = 'Arial';
    public static readonly TEXT_COLOUR: string = '#02f74b';
    public static readonly TEXT_SHADOW_STYLE: string = `-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000`;

    private static _instance: FPSDisplay;

    private _pixiApp!: PIXI.Application;

    public domText!: HTMLHeadingElement;
    public fpsUpdateIntervalId: number = -1;

    private constructor() {}

    public static get instance(): FPSDisplay {
        if(!FPSDisplay._instance)
            FPSDisplay._instance = new FPSDisplay();

        return FPSDisplay._instance;
    }

    public create(pixiApp: PIXI.Application, intervalMilliseconds: number = 500): void {
        this._pixiApp = pixiApp;

        this.domText = document.createElement('p');
        this.domText.style.fontFamily = FPSDisplay.FONT;
        this.domText.style.color = FPSDisplay.TEXT_COLOUR;
        this.domText.style.textShadow = FPSDisplay.TEXT_SHADOW_STYLE;
        this.domText.textContent = FPSDisplay.DEFAULT_FPS_STRING;

        document.body.appendChild(this.domText);

        // VSCode is throwing an error here for no reason
        // maddness really
        this.fpsUpdateIntervalId = setInterval(this.updateFps.bind(this), intervalMilliseconds);
    }

    public updateFps(): void {
        const measuredFps = Math.floor(this._pixiApp.ticker.FPS);

        if(this.domText)
            this.domText.textContent = `${measuredFps} ${FPSDisplay.FPS_TAG}`;
    }

    public destroy(): void {
        clearInterval(this.fpsUpdateIntervalId);

        document.body.removeChild(this.domText);
    }
};

import { getB2D } from './Physics/engine';

/** Class representing Vector
 * 
 *  This just exists as its a pain to convert PIXI Points to
 *  b2Vec2's, so by creating this class the b2Vec can be
 *  returned by a method
 *  
 *  Author: Jimy Houlbrook
 */
export class Vector extends PIXI.Point{
    private _b2d

    constructor(x: number = 0, y: number = 0){
        super(x, y);
        this.init();
    }

    async init(){
        this._b2d = await getB2D()
    }

    getB2Vec(){
        if(!this._b2d){
            console.error(`ERR: Box2D does not exist within Vector. Please run 'await Vector.init()'\nUtils.Vector.getB2Vec`);
            return;
        }
        return new this._b2d.b2Vec2(this.x, this.y)
    }
}