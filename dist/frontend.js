import * as Bang from './bang'

class PhysicsTest{
    constructor(){
        // Create application with arguments
        this.app = new Bang.Application({
            height: 500,
            width: 500,
            canvas: document.getElementById("app"),
            optional: {
                debug: true,
                background: "#ADD8E6",
                physics: true
            }
        });

        this.init();
    }

    async init(){
        // Initialise application
        await this.app._init();

        // load missing
        Bang.Assets.add({alias: 'missing', src: './assets/missing_texture.png'});
        await Bang.Assets.load('missing');

        // Create Physics Engine
        const appDimensions = this.app.getWidthHeight();
        console.log(appDimensions);
        const engine = new Bang.Physics.Engine(appDimensions.w, appDimensions.h);
        await engine.init();
        this.app.engine = engine;

        // Create Physics Layer
        const layer = new Bang.Physics.Layer(engine);
        this.app.addPhysicsLayer(layer);

        const groundOps =  {
            bodyType: "Static",
            shape: "box",
            gravScale: 10,
            density: 0,
        }

        // Movable Sprite
        // movement function needs to apply force rather than move position
    }
}

document.addEventListener('DOMContentLoaded', () => new PhysicsTest);