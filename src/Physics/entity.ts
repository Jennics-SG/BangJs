/** Name:   BangJs.Physics.Entity.ts
 *  Desc:   Physics Entity Logic
 *  Author: Jimy Houlbrook
 *  Date:   03/05/24
 */

import { Engine } from "./engine";
import { Layer } from "./layer";
import { StaticSprite } from "../Sprites/staticSpite";

export class Entity{
    private readonly _engine: Engine

    private _layer: Layer;

    public Sprite: typeof StaticSprite;

    public body;
    
    constructor(engine: Engine, layer: Layer, x: number, y: number, w: number, h: number){
        this._engine = engine;
        this._layer = layer;

        // 1: Craete a Body Def
        const bd = new this._engine.b2d.b2BodyDef();
        // This needs to be up to the user
        bd.set_type(this._engine.b2d.b2_dynamicBody);

        const worldXY = this._engine.coOrdPixelToWorld(x, y);

        bd.set_position(worldXY);

        // 2: Create Body 
        // ofc this is done by world and not the engine
        // like why would it be done by the engine 
        this.body = this._layer.world.CreateBody(bd);
        this.body.SetAwake(true);
        this.body.SetActive(true);
        
        // 3: Create Shape

        // Need to half w/h bcs origin is in the center
        const len = this._engine.scalarPixelsToWorld(w/2);
        const height = this._engine.scalarPixelsToWorld(h/2);
        const shape = new this._engine.b2d.b2PolygonShape();
        // This needs to be set by the user
        shape.SetAsBox(len, height);

        // 4: Create fixture def 
        const fd = new this._engine.b2d.b2FixtureDef();
        fd.shape = shape;

        // User sshould be able to set these
        fd.density = 1;
        fd.friction = 0.3;
        fd.restitution = 0.5;

        // Create fixture
        this.body.CreateFixture(fd);

        layer.addEntity(this);
    }

    public getPos(){
        return this.body.GetPosition();
    }
}