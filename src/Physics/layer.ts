import { Engine } from "./engine";
import { Sprite, Point } from "pixi.js";

export interface PhysOps{
    gravity: Point,    // Gravity Vector
    simulation:{
        maxTime: number         // Max time to be calculated during world step
        velIterations: number   // Velocity Iterations per step
        posIterations: number   // Position iterations per step
    }
}

export class Layer{
    // Each layer has an individual "world" allowing for diff physics settings 
    // Needs an array of entities within the layer
    // Physics options????

    private readonly _engine    // Instance of Box2D to access functions

    private _entities: Array<any>   // Need to find some way that i can set a type that works for
                                    // Graphics and Sprites, maybe PIXI Container?
    private _ops: PhysOps

    public world;     // Box2D world but cant set type

    constructor(engine: Engine, options?: PhysOps){
        if(!engine.b2d){
            console.error(`Physics engine has not been initialised\nPlease run 'await Engine.init()'\nBang.Physics.layer.ts`)
            return;
        }

        this._engine = engine;

        // // Set options
        // if(options) this._ops = options;        

        /*else*/ this._ops = {
            gravity: new engine.b2d.b2Vec2(0, 10),
            simulation: {
                maxTime: 1/60*1000,
                velIterations: 1,
                posIterations: 1
            }
        };

        // Array for entities
        this._entities = new Array();
        this.world = new this._engine.b2d.b2World(this._ops.gravity)
    }

    /** Move the physics world forward a step
     *  
     *  Should be added to Application ticker using
     *  ticker ms as the argument.
     * 
     * @param ms 
     */
    step(ms: number){
        const ops = this._ops.simulation
        const clamped = Math.min(ms, ops.maxTime);
        this.world.Step(clamped/1000, ops.velIterations, ops.posIterations);
        this.world.ClearForces();
    }

    // Find entity
    // Takes b2d body but yk, types r weird init
    async findEntity(e): Promise<Point>{
        const trans = e.getPos();
        return this._engine.coOrdWorldToPixel(trans.x, trans.y);
    }

    addEntity(e){
        this._entities.push(e);
    }
}
