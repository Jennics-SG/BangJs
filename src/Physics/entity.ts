/** Name:   BangJs.Physics.Entity.ts
 *  Desc:   Physics Entity Logic
 *  Author: Jimy Houlbrook
 *  Date:   03/05/24
 */

import { Engine } from "./engine";
import { Layer } from "./layer";
import { StaticSprite } from "../Sprites/staticSpite";
import { Point } from "pixi.js";

export interface EntityOps{
    bodyType: string,   // b2BodyType   Static||Kinematic||Dynamic
    shape: string,      // b2Shape      Box
    density: number,    // Density of Entity
    gravScale?: number,  // Scale of gravity on Entity
    friction?: number,   // Friction of Entity
    restitution?: number // Restitution of Entity
}

export class Entity{
    private readonly _engine: Engine

    public id: string;

    private _layer: Layer;
    private _ops: EntityOps

    public sprite: StaticSprite;

    public body;
    public shape;
    
    /** Physics Entity that gets tracked by Layer
     * 
     *  The physics entity gets created by the layer
     *  which tracks all the physics. To graphically represent
     *  an entity you need to set Physics in Application
     *  and add a sprite to the entity
     * 
     * @param x         Pixel X position of entity
     * @param y         Pixel Y position of entity
     * @param w         Pixel Width of entity
     * @param h         Pixel Height of entity
     * @param options   Entity options (see EntityOps)
     * @param engine    Physics Engine
     * @param layer     Physics Layer
     * @param id        ID of entity (Only here for testing, needs to be removed)
     */
    constructor(x: number, y: number, w: number, h: number, options: EntityOps,engine: Engine, layer: Layer, id: string){
        this.id = id;
        this._engine = engine;
        this._layer = layer;
        this._ops = options; 

        // 1: Craete a Body Def
        const bd = new this._engine.b2d.b2BodyDef();
        // This needs to be up to the user
        switch(this._ops.bodyType){
            case "Static" || "static":          // Static Body
                //bd.type = this._engine.b2d.b2_staticBody
                break;
            case "Dynamic" || "dynamic":        // Dynamic Body
                bd.type = this._engine.b2d.b2_dynamicBody;
                break;
            case "Kinematic" || "kinematic":    // Kinematic Body
                bd.type = this._engine.b2d.b2_kinematicBody;
                break;
            default:                            // Default Static Body
                console.error(                  // Error so user knows its defaulted
                    `ERR: Uknown Body Type of ${this._ops.bodyType}\nDefaulting to Static\nBangJs.Physics.Entity.constructor`
                );
                //bd.set_type(this._engine.b2d.b2_staticBody);
                break;
        }

        bd.set_position(this._engine.coOrdPixelToWorld(x, y));

        // 2: Create Body 
        this.body = this._layer.world.CreateBody(bd);
        this.body.SetAwake(true);
        this.body.SetActive(true);
        this.body.isSensor = false;
        
        // 3: Create Shape
        this.shape = new this._engine.b2d.b2PolygonShape();

        // TODO: Support more shapes than just box
        // TODO: Convert w/h to scalar 
        const shapeW = this._engine.scalarPixelsToWorld(w);
        const shapeH = this._engine.scalarPixelsToWorld(h);

        this.shape.SetAsBox(shapeW/2, shapeH/2);  // Halfed bcs origin in center

        // 4: Create fixture def 
        const fd = new this._engine.b2d.b2FixtureDef();
        fd.shape = this.shape;

        // User sshould be able to set these
        fd.density = this._ops.density;
        fd.friction = this._ops.friction? this._ops.friction : null;
        fd.restitution = this._ops.restitution? this._ops.restitution : null;

        // Create fixture
        this.body.CreateFixture(fd);

        layer.addEntity(this);
    }

    /** Get World Position of Entity */
    public getPos(){
        return this.body.GetPosition();
    }

    /** Apply force to the body
     * 
     * @param f {Vector}    Force to be applied
     */
    public applyForce(f: Point){
        // Convert to scalar
        f.x = this._engine.scalarPixelsToWorld(f.x);
        f.y = this._engine.scalarPixelsToWorld(f.y);

        console.log(f);

        const force = new this._engine.b2d.b2Vec2(f.x, f.y);
        this.body.ApplyForceToCenter(force);
    }
}