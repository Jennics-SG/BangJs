/** Name:   BangJs.Physics.Entity.ts
 *  Desc:   Physics Entity Logic
 *  Author: Jimy Houlbrook
 *  Date:   03/05/24
 */

import { Engine } from "./engine";
import { Layer } from "./layer";
import { StaticSprite } from "../Sprites/staticSpite";

interface EntityOps{
    bodyType: string,   // b2BodyType   Static||Kinematic||Dynamic
    shape: string,      // b2Shape      Box
    gravScale: number,  // Scale of gravity on Entity
    density: number,    // Density of Entity
    friction: number,   // Friction of Entity
    restitution: number // Restitution of Entity
}

export class Entity{
    private readonly _engine: Engine

    private _layer: Layer;
    private _ops: EntityOps

    public Sprite: typeof StaticSprite;

    public body;
    public shape;
    
    constructor(x: number, y: number, w: number, h: number, options: EntityOps,engine: Engine, layer: Layer){
        this._engine = engine;
        this._layer = layer;
        this._ops = options; 

        // 1: Craete a Body Def
        const bd = new this._engine.b2d.b2BodyDef();
        // This needs to be up to the user
        switch(this._ops.bodyType){
            case "Static" || "static":          // Static Body
                bd.set_type(this._engine.b2d.b2_staticBody);
                break;
            case "Dynamic" || "dynamic":        // Dynamic Body
                bd.set_type(this._engine.b2d.b2_dynamicBody);
                break;
            case "Kinematic" || "kinematic":    // Kinematic Body
                bd.set_type(this._engine.b2d.b2_kinematicBody);
                break;
            default:                            // Default Static Body
                console.error(                  // Error so user knows its defaulted
                    `ERR: Uknown Body Type of ${this._ops.bodyType}\nDefaulting to Static\nBangJs.Physics.Entity.constructor`
                );
                bd.set_type(this._engine.b2d.b2_staticBody);
                break;
        }
        bd.gravityScale = 1;

        x = x-h

        bd.set_position(this._engine.coOrdPixelToWorld(x, y));

        // 2: Create Body 
        this.body = this._layer.world.CreateBody(bd);
        const dynamicBody = this._ops.bodyType == "Dynamic" || this._ops.bodyType == "dynamic"
        this.body.SetAwake(dynamicBody);
        this.body.SetActive(dynamicBody);
        
        // 3: Create Shape
        this.shape = new this._engine.b2d.b2PolygonShape();

        // TODO: Support more shapes than just box
        // TODO: Convert w/h to scalar 
        const shapeW = this._engine.scalarPixelsToWorld(w);
        const shapeH = this._engine.scalarPixelsToWorld(h);

        console.log(w, h);

        this.shape.SetAsBox(shapeW, shapeH);  // Halfed bcs origin in center

        // 4: Create fixture def 
        const fd = new this._engine.b2d.b2FixtureDef();
        fd.shape = this.shape;

        // User sshould be able to set these
        fd.density = this._ops.density;
        fd.friction = this._ops.friction;
        fd.restitution = this._ops.restitution;

        // Create fixture
        this.body.CreateFixture(fd);

        layer.addEntity(this);
    }

    public getPos(){
        return this.body.GetPosition();
    }
}