
class MainScene extends Phaser.Scene {     

	constructor() {
        super("main");
    }


	preload ()
    {
        this.load.image('space', 'assets/space_4.png');
  
        this.load.spritesheet('ship', 'assets/ship_3.png', {frameWidth:44, frameHeight:33});
        this.load.spritesheet('virus', 'assets/virus_2.png', {frameWidth:22, frameHeight:19});
        this.load.image('laser', 'assets/laser_1.png');
    }

    create ()
    {
        //tileSprite = this.add.tileSprite(400, 300, 800, 600, 'sky');
      //  tileSprite.autoScroll(-1,0)

        this.add.image(400, 300, 'space');

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
                virus.body.velocity.y = Phaser.Math.Between(5, 20);
            }
        }



        

    /*    stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });
*/
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        
        this.physics.add.overlap(player, viruses, infected, null, this);
        this.physics.add.overlap(lasers, viruses, killed, null, this );


    }

    update ()
    { player.anims.play('move_ship', true);


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

    infected (player, viruses)
    {   this.physics.pause();
        player.anims.play('stop_ship');



        //score += 10;
        //scoreText.setText('Score: ' + score);
    }
    out_virus(virus) 

    { 
      
      x = virus.x
      y = virus.y 
      
    
      if (x > 800 || y > 600 )
        {virus.setPosition(Phaser.Math.Between(65, 735), 100);
         //empty = [];

        }

      }
    shoot()

    {   //lasers.children.iterate(function (child) {
        /*if (!child.active)
            {child.setPosition(player.x, player.y -10)
            }

        */

        laser_children = lasers.getChildren()
        laser_length =laser_children.length
        var success = false
        for (var i = 0; i < laser_length; i++) {
            child = laser_children[i]
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

    killed(laser, virus)

    { 
      //virus.anims.play('kill_virus');
      virus.disableBody(true, true);
      laser.disableBody(true, true);
      //virus.alive = false
      score += 10;
      scoreText.setText('Score: ' + score);

      fresh_batch();
      
      }
    out_laser(laser)
    { if (laser.y < -8)
        {laser.disableBody(true, true)
         //laser.destroy()
        }

    }
    
    fresh_batch()

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

}
 
