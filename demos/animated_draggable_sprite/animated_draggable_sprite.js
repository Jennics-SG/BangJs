import * as Bang from './bang'

class PhysicsTest{
    constructor(){
        // Create application with arguments
        this.app = new Bang.Application({
            height: 500,
            width: 500,
            canvas: document.getElementById("app"),
            optional: {
                debug: true,
                background: "#ADD8E6",
                physics: true
            }
        });

        this.init();
    }

    async init(){
        // Initialise application
        await this.app._init();

        // load spritesheet
        Bang.Assets.add({alias: 'animation', src: './assets/tusk_win_anim.json'});
        const sheet = await Bang.Assets.load('animation');

        console.log(sheet.animations);

        const animSprite = new Bang.Sprites.AnimatedDragableSprite(50, 50, sheet.animations['tusk_win_anim'], 100, 100);
        animSprite.play();
        this.app.addChild(animSprite);
    }
}

document.addEventListener('DOMContentLoaded', () => new PhysicsTest);