/** Name:   BangJs.Physics.Engine
 *  Desc:   TBH im not 100% sure yet but its gonna basically be an accessor
 *          class for Box2D
 *  Author: Jimy Houlbrook
 *  Date:   30/04/24
 */

import B2D from '../B2D/Box2D_v2.3.1_min';

/** Get Box2D instance */
export async function getB2D(){
    return new Promise((res, rej) => {
        B2D().then(box => {
            res(box);
        })
    });
}

/** Class that literally just gets instance of Box2D
 * 
 *  I wanted to do it in a way that only needs one call to get the physics
 *  engine directly, the best way forward was to create a "static" class
 *  that is initiated with Physics to download the engine and make it
 *  accessible
 * 
 *  Im a bit confused how this is all gonna work
 */
export class Engine{
    public b2d; 

    constructor(){
        // What lol
    }

    async init(){
        this.b2d = await getB2D();
    }
}
