
export class EndScene extends Phaser.Scene {
    constructor() {
        super("gameover");
    }


    preload ()
    {
        this.load.image('game_over', 'assets/game_over_w2.png');

        
    }
    create ()
    {this.add.image(400, 300, 'game_over');
}
}