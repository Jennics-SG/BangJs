import * as Bang from './bang'

class PhysicsTest{
    constructor(){
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
        // load missing
        Bang.Assets.add({alias: 'missing', src: './assets/missing_texture.png'});
        await Bang.Assets.load('missing');

        // Create Physics Engine
        const appDimensions = this.app.getWidthHeight();
        const engine = new Bang.Physics.Engine(appDimensions.w, appDimensions.h);
        await engine.init();
        this.app.engine = engine;

        // Create Physics Layer
        const layer = new Bang.Physics.Layer(engine);
        this.app.addPhysicsLayer(layer);

        await this.app._init();

        document.addEventListener('click', this.placeBox.bind(this));
    }

    placeBox(e){
        const x = e.clientX;
        const y = e.clientY;

        // Is in bounds
        const appBounds = this.app.getWidthHeight();
        if(!x <= appBounds.x && !y <= appBounds.y) return
        
        const box = new Bang.Sprites.StaticSprite(x, y, Bang.Assets.get('missing'), 100, 100);
        const entity = new Bang.Entity(this.app.engine, this.app._physicsLayers[0], x, y, 100, 100);
        this.app.addChild(box);
    }
}

document.addEventListener('DOMContentLoaded', () => new PhysicsTest);