/** Name:   BangJs.Physics.ts
 *  Desc:   Logic for physics, will need refactorin
 *  Author: Jimy Houlbrook
 *  Date:   30/04/24
 */

import B2D from './B2D/Box2D_v2.3.1_min';

/** Get Box2D instance */
export async function getB2D(){
    return new Promise((res, rej) => {
        B2D().then(box => {
            res(box);
        })
    });
}

export class PhysicsLayer{
    constructor(){
        // Download Box2D from
        this.init();
    }
    
    async init(){
        console.log(await getB2D());
    }
}