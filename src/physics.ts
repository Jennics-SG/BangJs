/** Name:   BangJs.Physics.ts
 *  Desc:   Logic for physics, will need refactorin
 *  Author: Jimy Houlbrook
 *  Date:   30/04/24
 */

import B2D from './B2D/Box2D_v2.3.1_min';

// 1: Download b2d using b2d factory

export class PhysicsLayer{
    constructor(){
        (async ()=> {
            B2D().then(box2D => {
                console.log(box2D);
            });
        })();
    }
}