import { Engine } from "./engine";
import { Vector } from "../utils";
import { Sprite } from "pixi.js";

export interface PhysOps{
    gravity: Vector,    // Gravity Vector
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

    private _entities: Array<typeof Sprite>
    private _ops: PhysOps

    private _world;     // Box2D world but cant set type

    constructor(engine: Engine, options?: PhysOps){
        if(!engine.b2d){
            console.error(`Physics engine has not been initialised\nPlease run 'await Engine.init()'\nphysics init`)
            return;
        }

        this._engine = engine.b2d;

        // Set options
        if(options) this._ops = options;
        
        // Default options
        else this._ops = {
            gravity: new Vector(),
            simulation: {
                maxTime: 1/60*1000,
                velIterations: 1,
                posIterations: 1
            }
        };

        // Create Box2D World
        this._world = new this._engine.b2World(this._ops.gravity);

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
        this._world.Step(clamped/1000, ops.velIterations, ops.posIterations);
    }

    // Find entity
    // Takes b2d body but yk, types r weird init
    findEntity(e): Vector{
        const {x, y} = e.GetPosition();
        return new Vector(x, y);
    }
}
