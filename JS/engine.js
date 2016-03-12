var robot = {
    constants:{
        SPEED : 100,
        ROTATION_SPEED: 20,
    },
    stop:function(){
        this.ingame.body.setZeroVelocity();
        this.ingame.body.setZeroRotation();
    },
    create: function(game, x, y){
        this.ingame = game.add.sprite(x, y, 'ship');
        this.ingame.scale.set(2);
        this.ingame.smoothed = false;
        this.ingame.animations.add('fly', [0,1,2,3,4,5], 10, true);
        this.ingame.play('fly');

        //  Create our physics body. A circle assigned the playerCollisionGroup
        game.physics.p2.enable(this.ingame);
        this.ingame.body.setRectangle(56, 56);
    },
    north:function(){
        this.ingame.body.moveUp(this.constants.SPEED);
    },
    south:function(){
        this.ingame.body.moveDown(this.constants.SPEED);
    },
    west:function(){
        this.ingame.body.moveLeft(this.constants.SPEED);
    },
    east:function(){
        this.ingame.body.moveRight(this.constants.SPEED);
    },
    left:function(){
        this.ingame.body.rotateLeft(this.constants.ROTATION_SPEED);
    },
    right:function(){
        this.ingame.body.rotateRight(this.constants.ROTATION_SPEED);
    },
    setProgram:function(program){
        this.program = program;
    },
    step:function(){
        this.stop();
        var nextStep = this.program.pop();
        switch(nextStep){
            case 'n':
                this.north();
                break;
            case 's':
                this.south();
                break;
            case 'w':
                this.west();
                break;
            case 'e':
                this.east();
                break;
            case 'l':
                this.left();
                break;
            case 'r':
                this.right();
                break;
        }
    }
};

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
    game.load.spritesheet('ship', 'sprites/humstar.png', 32, 32);
    game.load.image('ball', 'sprites/shinyball.png');
}

var cursors;
var customBounds;

function create() {

    //  The bounds of our physics simulation
    var bounds = new Phaser.Rectangle(100, 100, 400, 400);

    game.physics.startSystem(Phaser.Physics.P2JS);

    game.physics.p2.restitution = 0.9;

    //  Some balls to collide with
    balls = game.add.physicsGroup(Phaser.Physics.P2JS);

    for (var i = 0; i < 1; i++)
    {
        var ball = balls.create(bounds.randomX, bounds.randomY, 'ball');
        ball.body.setCircle(16);
    }

    robot.create(game, bounds.left, bounds.top);
    robot.setProgram('ssssssssssssseeeeeeeeeeeeeeeeeeeeeeeellllllllllllllllllllnnnnnnnnnssssssssssssssssssssssssss'.split(''));

    //  Create a new custom sized bounds, within the world bounds
    customBounds = { left: null, right: null, top: null, bottom: null };

    createPreviewBounds(bounds.x, bounds.y, bounds.width, bounds.height);

    //  Just to display the bounds
    var graphics = game.add.graphics(bounds.x, bounds.y);
    graphics.lineStyle(4, 0xffd900, 1);
    graphics.drawRect(0, 0, bounds.width, bounds.height);

    cursors = game.input.keyboard.addKeys({
        up: Phaser.KeyCode.W,
        down: Phaser.KeyCode.S,
        left: Phaser.KeyCode.A,
        right: Phaser.KeyCode.D,
        turn_left: Phaser.KeyCode.Q,
        turn_right: Phaser.KeyCode.E
    });
}

function createPreviewBounds(x, y, w, h) {

    var sim = game.physics.p2;

    //  If you want to use your own collision group then set it here and un-comment the lines below
    var mask = sim.boundsCollisionGroup.mask;

    customBounds.left = new p2.Body({ mass: 0, position: [ sim.pxmi(x), sim.pxmi(y) ], angle: 1.5707963267948966 });
    customBounds.left.addShape(new p2.Plane());
    // customBounds.left.shapes[0].collisionGroup = mask;

    customBounds.right = new p2.Body({ mass: 0, position: [ sim.pxmi(x + w), sim.pxmi(y) ], angle: -1.5707963267948966 });
    customBounds.right.addShape(new p2.Plane());
    // customBounds.right.shapes[0].collisionGroup = mask;

    customBounds.top = new p2.Body({ mass: 0, position: [ sim.pxmi(x), sim.pxmi(y) ], angle: -3.141592653589793 });
    customBounds.top.addShape(new p2.Plane());
    // customBounds.top.shapes[0].collisionGroup = mask;

    customBounds.bottom = new p2.Body({ mass: 0, position: [ sim.pxmi(x), sim.pxmi(y + h) ] });
    customBounds.bottom.addShape(new p2.Plane());
    // customBounds.bottom.shapes[0].collisionGroup = mask;

    sim.world.addBody(customBounds.left);
    sim.world.addBody(customBounds.right);
    sim.world.addBody(customBounds.top);
    sim.world.addBody(customBounds.bottom);

}

function update() {

    robot.step();
}
