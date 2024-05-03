/** Name:   BangJs.Physics.ts
 *  Desc:   Logic for physics, will need refactorin
 *  Author: Jimy Houlbrook
 *  Date:   30/04/24
 */




// TESTING STUFF ---------------------------
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