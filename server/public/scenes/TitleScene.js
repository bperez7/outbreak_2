
export class TitleScene extends Phaser.Scene {
    constructor() {
        super("title");
    }


    preload ()
    {
        this.load.image('title_screen', 'assets/title_3.png');

        this.load.image('title_text', 'assets/title_2_512.png');

        this.load.image('play_text', 'assets/play_text_1_512.png');
        this.load.image('play_text_2', 'assets/play_text_2_512.png');
        this.load.audio('Opening', 'assets/title_tune_1.wav')
    }
    create ()
    {
        //tileSprite = this.add.tileSprite(400, 300, 800, 600, 'sky');
      //  tileSprite.autoScroll(-1,0)
        let played = false;
        let title_screen = this.add.image(400, 300, 'title_screen');
        this.add.image(400, 400, 'title_text');
        let open_song = this.sound.add('Opening');
       // open_song.play();

        let playButton = this.add.image(400, 500, 'play_text');
        let playButton_2 = this.add.image(400, 500, 'play_text_2');
        playButton_2.visible = false

        playButton.setInteractive();
        playButton_2.setInteractive();
        playButton.on('pointerover', function() {
            console.log('hover')
            playButton.visible = false
            playButton_2.visible = true
            if (!played)
            {
            open_song.play();
            played = true;}

           
        })

        playButton_2.on('pointerout', function() {
            playButton.visible = true
            playButton_2.visible = false
        })

        playButton_2.on('pointerup', function () {
            this.scene.start('main')
        }, this)

        title_screen.setInteractive()
        //title_screen.on('poinerover', function(){ 
          //      })



    }
}


