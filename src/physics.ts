/** Name:   BangJs.Physics.ts
 *  Desc:   Logic for physics, will need refactorin
 *  Author: Jimy Houlbrook
 *  Date:   30/04/24
 */


import { Engine } from "./Physics/engine";
import { Sprite } from "pixi.js";

export interface PhysOps{
    gravity: {
        x: number,      // Change to x in m/s/s
        y: number       // Change to y in m/s/s
    },
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
            gravity: {
                x: 0,
                y: 0
            },
            simulation: {
                maxTime: 1/60*1000,
                velIterations: 1,
                posIterations: 1
            }
        };

        this.init();
    }

    init(){
        // Change Gravity option to vec
        const G = new this._engine.b2Vec2(
            this._ops.gravity.x,
            this._ops.gravity.y
        )

        // Create Box2D World
        this._world = new this._engine.b2World(G);
    }
         
    step(ms: number){
        const ops = this._ops.simulation

        const clamped = Math.min(ms, ops.maxTime);
        this._world.Step(clamped/1000, ops.velIterations, ops.posIterations);
    }

    // findEntity(entity)
    //      Find entity according to physics world
    //      Return pos & velocity

    // Delta()
    //      Loop Function
}

// TESTING STUFF -----------------------------

// export class PhysicsTest{
//     constructor(){
//         // Download Box2D from
//         this.init();
//     }
    
//     async init(){

//         // Just testing physics atm really
//         const { b2BodyDef, b2_dynamicBody, b2PolygonShape, b2Vec2, b2World } = Engine;

//         // in m/s/s
//         const gravity = new b2Vec2(0, 10);
//         const world = new b2World(gravity);

//         const sideLength = 1;
//         const square = new b2PolygonShape();
//         square.SetAsBox(sideLength / 2, sideLength / 2);
 
//         const zero = new b2Vec2(0, 0);

//         const bd = new b2BodyDef();
//         bd.set_type(b2_dynamicBody);
//         bd.set_position(zero);

//         console.log(world);

//         const body = world.CreateBody(bd);
//         body.CreateFixture(square, 1);
//         body.SetTransform(zero, 0);
//         body.SetLinearVelocity(zero);
//         body.SetAwake(true);
//         body.SetActive(true);

//         // Physics Simulation
//         const maxTimeStepMs = 1/60*1000;
//         const velocityIterations = 1;
//         const positionIterations = 1;

//         /** Advance world physics by ms
//          *  @param {number} ms
//          */
//         const step = (ms: number) => {
//             const clampedDeltaMs = Math.min(ms, maxTimeStepMs);
//             world.Step(clampedDeltaMs/1000, velocityIterations, positionIterations);
//         };

//         // I guess this is where rendering would be??
//         const whereIsSquare = ()=> {
//             {
//                 const {x, y} = body.GetLinearVelocity();  // Velocity
//                 console.table({x, y})
//             }
//             {
//                 const {x, y} = body.GetPosition();          // Position
//                 console.table({x, y});
//             }
//         }

//         // Im not sure what this is about
//         let handle;
//         (function loop(prevMs){
//             const nowMs = window.performance.now();
//             handle = requestAnimationFrame(loop.bind(null, nowMs));
//             const deltaMs = nowMs-prevMs;
//             step(deltaMs);
//             whereIsSquare();
//         }(window.performance.now()));
//     }
// }