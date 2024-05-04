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

        const groundSprite = new Bang.Sprites.StaticSprite(
            150, 300, 
            Bang.Assets.get("missing"), 
            250, 20
        );
        const groundEntity = new Bang.Physics.Entity(
            150, 300, 
            groundSprite.width, groundSprite.height, 
            groundOps, this.app.engine, this.app._physicsLayers[0]
        );
        groundEntity.sprite = groundSprite

        this.app.addChild(groundSprite)

        console.log(groundSprite);

        document.addEventListener('click', this.placeBox.bind(this));
    }

    async placeBox(e){
        const x = e.clientX;
        const y = e.clientY;

        // Is in bounds
        const appBounds = this.app.getWidthHeight();
        if(!x <= appBounds.x && !y <= appBounds.y) return

        // Create Box
        const box = new Bang.Sprites.StaticSprite(x, y, Bang.Assets.get('missing'), 50, 50);

        // Create Physics Entity
        const entityOps = {
            bodyType: "Dynamic",
            shape: "box",
            gravScale: 1,
            density: 1,
            friction: 0.3,
            restitutiuon: 0.5
        }

        const entity = new Bang.Physics.Entity(
            x, y, 
            box.width, box.height, 
            entityOps, this.app.engine, this.app._physicsLayers[0]
        );

        // Add Box to physics Entity
        entity.sprite = box;

        this.app.addChild(box);
    }
}

document.addEventListener('DOMContentLoaded', () => new PhysicsTest);