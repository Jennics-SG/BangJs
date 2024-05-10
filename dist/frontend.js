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

        // Boudnaries around application
        const boundaryOps =  {
            bodyType: "Static",
            shape: "box",
            gravScale: 10,
            density: 0,
        }
        
        const boundary1Sprite = new Bang.Sprites.StaticSprite(
            0, 0 + appDimensions.h / 2, Bang.Assets.get("missing"),
            15, appDimensions.h
        );
        const boundary1Entity = new Bang.Physics.Entity(
            0 + boundary1Sprite.width / 2, 0 + appDimensions.h / 2,
            boundary1Sprite.width, boundary1Sprite.height,
            boundaryOps, this.app.engine, this.app._physicsLayers[0], "boundary"
        );
        boundary1Sprite.setPhysicsEntity(boundary1Entity);
        this.app.addChild(boundary1Sprite);

        const boundary2Sprite = new Bang.Sprites.StaticSprite(
            appDimensions.w, 0 + appDimensions.h / 2, Bang.Assets.get("missing"),
            15, appDimensions.h
        )
        const boundary2Entity = new Bang.Physics.Entity(
            appDimensions.w - boundary2Sprite.width / 2, 0 + appDimensions.h / 2,
            boundary2Sprite.width, boundary2Sprite.height,
            boundaryOps, this.app.engine, this.app._physicsLayers[0], "boundary"
        );
        boundary2Sprite.setPhysicsEntity(boundary2Entity);
        this.app.addChild(boundary2Sprite);

        const boundary3Sprite = new Bang.Sprites.StaticSprite(
            0, appDimensions.h, Bang.Assets.get("missing"),
            appDimensions.w, 15
        );
        const boundary3Entity = new Bang.Physics.Entity(
            0 + boundary3Sprite.width / 2, appDimensions.h - boundary3Sprite.height / 2,
            boundary3Sprite.width, boundary3Sprite.height,
            boundaryOps, this.app.engine, this.app._physicsLayers[0], "boundary"
        );
        boundary3Sprite.setPhysicsEntity(boundary3Entity);
        this.app.addChild(boundary3Sprite);

        const boundary4Sprite = new Bang.Sprites.StaticSprite(
            0 + appDimensions.w /2, 0, Bang.Assets.get("missing"),
            appDimensions.w, 15 
        );
        const boundary4Entity = new Bang.Physics.Entity(
            0 + boundary4Sprite.width / 2, 0 + boundary4Sprite.height / 2,
            boundary4Sprite.width, boundary4Sprite.height,
            boundaryOps, this.app.engine, this.app._physicsLayers[0], "boundary"
        );
        boundary4Sprite.setPhysicsEntity(boundary4Entity);
        this.app.addChild(boundary4Sprite);

        // Movable Sprite with Physics
        const controls = {
            KeyW: false,
            KeyA: false,
            KeyS: false,
            KeyD: false,
        };

        const movableOps = {
            bodyType: "Dynamic",
            shape: "box",
            gravScale: 0.1,
            friction: 0.5,
            density: 0.1,  
        }

        const movableSprite = new Bang.Sprites.MovableSprite(
            250, 250, Bang.Assets.get("missing"),
            controls, 50, 50
        );

        const movableEntity = new Bang.Physics.Entity(
            movableSprite.x, movableSprite.y,
            movableSprite.width, movableSprite.height,
            movableOps, this.app.engine, this.app._physicsLayers[0], "movable"
        );
        movableSprite.setPhysicsEntity(movableEntity);
        this.app.addChild(movableSprite);

        const spriteMovement = function(){
            if(!this._physicsEntity) return;
            if(this._controls['KeyA'])
                this._physicsEntity.applyForce(new Bang.Vector(-1e5, 0));
            if(this._controls['KeyD'])
                this._physicsEntity.applyForce(new Bang.Vector(+1e5, 0));
            if(this._controls['KeyW'])
                this._physicsEntity.applyForce(new Bang.Vector(0, -10000));
        }.bind(movableSprite);
        this.app.addToTicker(spriteMovement)
    }
}

document.addEventListener('DOMContentLoaded', () => new PhysicsTest);