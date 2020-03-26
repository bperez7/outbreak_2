
var player;
    var stars;
    var platforms;
    var cursors;
    var score = 0;
    var scoreText;
    var batch_num = 0;
var lasers;
var viruses;
var  cursors;
var scoreText;
var x
var y
var health_group
//var health_children
var health_count = 0
var caseText
var cases = 0
var timer
var go_time_start = 'live'
var go_time_end
export class MainScene extends Phaser.Scene
 {	
    constructor() {
        super("main");
    }


    preload ()
    {
        this.load.image('space', 'assets/aerial_shot.png');
  
        this.load.spritesheet('ship', 'assets/ship_3.png', {frameWidth:44, frameHeight:33});
        this.load.spritesheet('virus', 'assets/virus_2.png', {frameWidth:22, frameHeight:19});
        this.load.image('laser', 'assets/laser_1.png');
        this.load.image('health', 'assets/small_mask_1.png');
        this.load.image('block', 'assets/block_1.png')
        this.load.image('block_red', 'assets/block_red.png')
    }

    create ()
    {
        //tileSprite = this.add.tileSprite(400, 300, 800, 600, 'sky');
      //  tileSprite.autoScroll(-1,0)

        //timer
        timer = this.time.addEvent({
        //delay: 1500,                // ms
        //callback: callback,
        //args: [],
        //callbackScope: thisArg,
        loop: true
    });



        this.add.image(400, 300, 'space');



        health_group = this.add.group();
        var health_block = this.add.image(90, 540, 'block');
        health_block.scaleX = 1.2


        for (var x = 0; x < 5; x++)
        {
            var health = health_group.create(50+x*20, 540, 'health');
        }

        player = this.physics.add.sprite(100, 450, 'ship');

    
        player.setCollideWorldBounds(true);

        lasers = this.physics.add.group()

        this.input.keyboard.on('keydown_SPACE', shoot);
        this.input.keyboard.on('keydown_A', shoot);

        viruses = this.physics.add.group()
 
       

        this.anims.create({
            key: 'move_ship',
            frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'stop_ship',
            frames: [{key:'ship', frame:0}],
            frameRate: 10,
            
        });

        this.anims.create({
            key: 'move_virus',
            frames: this.anims.generateFrameNumbers('virus', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'kill_virus',
            frames: [{key:'virus', frame:2}],
            frameRate: 1,
            repeat: 5
        });
    
    

        cursors = this.input.keyboard.createCursorKeys();

       

        for (var y = 0; y < 4; y++)
        {
            for (var x = 0; x < 5; x++)
            {
                var virus = viruses.create(65 + Phaser.Math.Between(1,5) * 140,65+ y * 10, 'virus');
                virus.name = 'virus' + x.toString() + y.toString();
                //virus.checkWorldBounds = true;
                //virus.events.onOutOfBounds.add(virusOut, this);
                virus.body.velocity.y = Phaser.Math.Between(1, 5)*4;
            }
        }



        

    /*    stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });
*/
        
        var block = this.add.image(100,32, 'block');
        block.scaleX = 3.5;
        block.scaleY = 1.5;

        var red_block = this.add.image(710, 32, 'block_red');
        red_block.scaleX = 3.5;
        red_block.scaleY = 1.5;


        scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });


        caseText = this.add.text(575, 16, 'Cases: 0', {fontSize: '32px', fill: '#000'})


        //this.bringToTop(scoreText)
       // block.depth = 0
        //scoreText.depth = 1
        this.physics.add.overlap(player, viruses, infected, null, this);
        this.physics.add.overlap(lasers, viruses, killed, null, this );



    }

    update ()

    { if (go_time_start != 'live') 
    {
        if (timer.getElapsed() - go_time_start > 3000)
       {this.scene.start('gameover')}
       console.log(timer.getElapsed() - go_time_start)
   }
      player.anims.play('move_ship', true);
      //console.log(timer.getElapsed())

      viruses.children.iterate(out_virus);
      
      viruses.children.iterate(function (child) {
       // if (virus.alive)
           child.anims.play('move_virus', true);
            
    })





      if (cursors.left.isDown)
        {
            player.setVelocityX(-160);


       
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

    
        }
        else
        {
            player.setVelocityX(0);


        }

       if (cursors.up.isDown)
        {
            player.setVelocityY(-80);
        }
        else if (cursors.down.isDown)
        {
            player.setVelocityY(80);
        }
        else {
            player.setVelocityY(0);
        }

        //check if lasers out of bound
        
    
        
    }

}
    function infected (player, virus)
    {   //this.physics.pause();
        //player.anims.play('stop_ship');
        if (health_count < 5)
            {
        health_count = health_count + 1
        var health_children = health_group.getChildren()
        var health = health_children[health_children.length-health_count]
        health.visible = false

        virus.disableBody(true, true)
            }
        else 
            {
                this.physics.pause();
                player.setTint(0xff0000);
                go_time_start = timer.getElapsed()

                //this.scene.start('gameover')}
                



        //score += 10;
        //scoreText.setText('Score: ' + score);
    }}
    function out_virus(virus) 

    { 
      
     var  x = virus.x
     var y = virus.y 
     
     

    
      if (x > 800 || y > 600 )
        {virus.setPosition(Phaser.Math.Between(65, 735), 100);
         cases += 1
         caseText.setText('Cases: ' + cases);
         score-=5;
         scoreText.setText('Score: ' + score);
            //empty = [];

        }

      }
    function shoot()

    {   //lasers.children.iterate(function (child) {
        /*if (!child.active)
            {child.setPosition(player.x, player.y -10)
            }

        */

        var laser_children = lasers.getChildren()
        var laser_length =laser_children.length
        var success = false
        for (var i = 0; i < laser_length; i++) {
            var child = laser_children[i]
            if (child.active == false)
                {//child.setPosition(player.x, player.y - 10);
                 child.enableBody(true, player.x, player.y - 10, true, true)
                 child.setVelocityY(-100)
                 success = true;
                    break; } }          

            
        if (success == false){
                var laser = lasers.create(player.x, player.y - 10, 'laser');
                laser.setVelocityY(-100)}

        lasers.children.iterate(out_laser);

    }

    function killed(laser, virus)

    { 
      //virus.anims.play('kill_virus');
      virus.disableBody(true, true);
      laser.disableBody(true, true);
      //virus.alive = false
      score += 10;
      scoreText.setText('Score: ' + score);

      fresh_batch();
      
      }
    function out_laser(laser)
    { if (laser.y < -8)
        {laser.disableBody(true, true)
         //laser.destroy()
        }

    }
    
    function fresh_batch()

    {
     if (viruses.countActive(true) === 0)
    { batch_num = batch_num + 3
        //  A new batch of stars to collect


        viruses.children.iterate(function (child) {

            child.enableBody(true, Phaser.Math.Between(65, 730), 100, true, true);
            child.setVelocityY(Phaser.Math.Between(5 + batch_num, 20 + batch_num));

        });
        var virus = viruses.create(Phaser.Math.Between(65, 730),100, 'virus');
        virus.setVelocityY(Phaser.Math.Between(5+batch_num, 20 + batch_num));

    }
    }



 
