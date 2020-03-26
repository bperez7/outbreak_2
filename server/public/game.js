    import {TitleScene} from "./scenes/TitleScene";
    import {MainScene} from "./scenes/MainScene";
    import {EndScene} from "./scenes/EndScene";



    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        //scene:  {[MainScene]
        scene:[TitleScene, MainScene, EndScene]
             //preload: preload,
             //create: create,
            // update: update
        
    };

    

    var game = new Phaser.Game(config);


  /*  function preload ()
    {
        this.load.image('title_screen', 'assets/title_2.png');
    }
    function create ()
    {
        //tileSprite = this.add.tileSprite(400, 300, 800, 600, 'sky');
      //  tileSprite.autoScroll(-1,0)

        this.add.image(400, 300, 'title_screen');
    }
    function update()
    {}
*/ 

