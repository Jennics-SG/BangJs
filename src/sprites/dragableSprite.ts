/** Name:   BangJs.Sprites.DragableSprite
 *  Desc:   Logic for Dragable Sprite.
 *  Author: Jimy Houlbrook
 *  Date:   28/04/24
 */

import { Texture, Point } from "pixi.js"

import { StaticSprite } from "./staticSpite";

export class DragableSprite extends StaticSprite{
    private _dragPoint: Point;
    private _dragging: Boolean;

    /** Dragable Sprite
     * 
     * @param x         X Position
     * @param y         Y Position
     * @param texture   Texture
     * @param w         Optional - Width
     * @param h         Optional - Height
     */
    constructor(x: number = 0, y: number = 0, texture: Texture, w?: number, h?: number){
        super(x, y, texture);
        this.position.set(x, y);
        if(w) this.width = w;
        if(h) this.height = h;

        this.interactive = true;
        this._dragPoint = new Point();
        this._dragging = false;

        // Dragging Callbacks
        this.on('pointerdown', this.dragStart.bind(this));
        this.on('pointermove', this.dragMove.bind(this));
        this.on('pointerup', this.dragEnd.bind(this));
    }

    // NON-PHYSICS DRAGGING LOGIC ---------------------------------------------------------

    // Drag Start
    private dragStart(e: MouseEvent){
        if(this._physicsEntity){
            this.physicsDragStart(e);
            return;
        }
        const mousePoint = new Point(e.x, e.y);

        this._dragPoint = new Point(
            this.x - mousePoint.x,
            this.y - mousePoint.y
        );

        this._dragging = true;
        this.updateDragPosition(mousePoint);
    }


    // Drag Move
    private dragMove(e: MouseEvent){
        if(this._physicsEntity){
            this.physicsDragMove(e);
            return;
        }

        if(!this._dragging) return;

        const mousePoint = new Point(e.x, e.y);
        this.updateDragPosition(mousePoint);
    }

    // Drag End
    private dragEnd(e: MouseEvent){
        if(this._physicsEntity){
            this.physicsDragEnd(e);
            return;
        }
        if(!this._dragging) return;

        this._dragging = false;
    }

    // Update Dragging Position
    private updateDragPosition(mousePoint: Point){
        if(!this._dragging && this._dragPoint)
            return

        this.x = mousePoint.x + this._dragPoint.x;
        this.y = mousePoint.y + this._dragPoint.y;
    }

    // PHYSICS DRAGGING LOGIC -------------------------------------------------------------

    // Drag Start
    private physicsDragStart(e: MouseEvent){
        // Create distance joint & attach to entity
    }

    // Drag Move
    private physicsDragMove(e: MouseEvent){
        // Move distance joint to mouse pos
    }

    // Drag End
    private physicsDragEnd(e: MouseEvent){
        // Destroy Distance Joint
    }

}