import { Engine } from "./engine";
import { Entity } from "./entity";
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

    public entities: Array<any>     // Need to find some way that i can set a type that works for
                                    // Graphics and Sprites, maybe PIXI Container?
    private _ops: PhysOps

    public world;     // Box2D world but cant set type

    /** Create new Physics Layer
     * 
     * @param engine    Physics Engine
     * @param options   Layer Options object
     * @returns error if no engine 
     */
    constructor(engine: Engine, options?: PhysOps){
        if(!engine.b2d){
            console.error(`Physics engine has not been initialised\nPlease run 'await Engine.init()'\nBang.Physics.layer.ts`)
            return;
        }

        this._engine = engine;

        // Set options
        if(options) this._ops = options;        
        else this._ops = {
            // TODO: Change to force vec
            gravity: this._engine.CreateForceVector(0, 100),
            simulation: {
                maxTime: 1/60*1000,
                velIterations: 100,
                posIterations: 8
            }
        };

        // Array for entities
        this.entities = new Array();
        this.world = new this._engine.b2d.b2World(this._ops.gravity)
    }

    /** Find entity according to Pixel Position
     * 
     * @param e     Entity
     * @returns     
     */
    public findEntity(e: Entity): Point{
        const trans = e.getPos();
        return this._engine.coOrdWorldToPixel(trans.x, trans.y);
    }

    /** Add an Entity to the Layer
     * 
     * @param e Entity
     */
    public addEntity(e: Entity): void{
        this.entities.push(e);
    }

    /** Move the physics world forward a step
     *  
     *  Should be added to Application ticker using
     *  ticker ms as the argument.
     * 
     * @param ms 
    */
    public step(ms: number){
        const ops = this._ops.simulation
        const clamped = Math.min(ms, ops.maxTime);
        this.world.Step(clamped/1000, ops.velIterations, ops.posIterations);
    }

    /** Redraw entities if their Physics position if
     *  it different from render position
     * 
     *  This is the cause for the weird 'glitchy' look
     *  that is caused by rendering. It can be fixed by
     *  rounding or flooring the position, but this
     *  makes it look choppy.
     * 
     */
    public redrawEntities(){
        for(const entity of this.entities){
            // Exit if theres no sprite
            if(!entity.sprite) continue;

            const entityPos = this.findEntity(entity);
            const spritePos = entity.sprite.position;

            // Dont change if position is the same
            if(
                spritePos.x == entityPos.x &&
                spritePos.y == entityPos.y 
            ) continue;
            

            // Redraw sprite to physics if physics enabled     
            if(entity.enabled){
                entity.sprite.position.set(entityPos.x, entityPos.y);
                entity.sprite.rotation = entity.body.GetAngle();
            } else {
                // Move physiocs to sprite if disabled
                const newEntityPos = new this._engine.b2d.getB2Vec2(spritePos.x, spritePos.y);
                entity.body.SetTransform(newEntityPos, entity.sprite.rotation);
            }
        }
    }
}
