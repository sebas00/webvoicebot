var config = {
    type: Phaser.AUTO,
    parent: 'botsdance',
    
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 }
        }
    },
    title: 'Can.Bots.Dance',
    
};
var startbotdance = false;
var stopbotdance = false;
var botisdancing = false;
var map;
var tileset;
var layer;
var player;
var dancingbot;
var pickups;
var cursors;
var game = new Phaser.Game(config);

function preload ()
{
    this.load.atlas('yellowbot', 'assets/yellowbot.png', 'assets/yellowbot.json');
    this.load.image('tiles', 'assets/gridtiles.png');
    this.load.tilemapTiledJSON('map', 'assets/simple-map.json');
    this.load.image('player', 'assets/phaser-dude.png');
}

function create ()
{
    //  Here we just pass the texture atlas key to `create` and it will extract all frames
    //  from within it, numerically sorting them for the animation.
    map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
    tileset = map.addTilesetImage('tiles');
    layer = map.createDynamicLayer('Level1', tileset);

    map.setCollision([ 20, 48 ]);

    pickups = map.filterTiles(function (tile) {
        return (tile.index === 82);
    });

    player = this.add.sprite(96,96, 'player')
    //player = this.add.rectangle(96, 96, 24, 38, 0xffff00);

    this.physics.add.existing(player);

    this.physics.add.collider(player, layer);

    cursors = this.input.keyboard.createCursorKeys();

    cursors.up.on('down', function () {
        if (player.body.blocked.down)
        {
            player.body.setVelocityY(-360);
        }
    }, this);

    var text = this.add.text(80, 550, '', { font: '16px Courier', fill: '#ffffff' });

    text.setText([
        'Game Title: ' + game.config.gameTitle
    ]);
    this.anims.create({
        key: 'walk',
        frames: 'yellowbot',
        frameRate: 5,
        repeat: -1
    });
   // this.add.sprite(400, 300).play('walk');
    
}

function update ()
{

    if(startbotdance){
        startbotdance = false;
        if(!botisdancing){
        dancingbot = this.add.sprite(400, 300).play('walk').setScale(0.8, 0.8);
        }
        botisdancing = true;
    }



    player.body.setVelocityX(0);

    if (cursors.left.isDown)
    {
        player.body.setVelocityX(-200);
    }
    else if (cursors.right.isDown)
    {
        player.body.setVelocityX(200);
    }

    this.physics.world.overlapTiles(player, pickups, hitPickup, null, this);
}

function hitPickup (player, tile)
{
    window.socket.send("hi");
    map.removeTile(tile, 29, false);
    
    pickups = map.filterTiles(function (tile) {
        return (tile.index === 82);
    });
}
