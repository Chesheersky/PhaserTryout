var robot = {
    constants:{
        SPEED : 100,
        ROTATION_SPEED: 20,
    },
    stop:function(){
        this.ingame.body.setZeroVelocity();
        this.ingame.body.setZeroRotation();
    },
    preload: function(game){
        this.game = game;
        game.load.spritesheet('robot', 'sprites/humstar.png', 32, 32);
    },
    create: function(x, y){
        this.ingame = this.game.add.sprite(x, y, 'robot');
        this.ingame.scale.set(2);
        this.ingame.smoothed = false;
        this.ingame.animations.add('fly', [0,1,2,3,4,5], 10, true);
        this.ingame.play('fly');

        //  Create our physics body. A circle assigned the playerCollisionGroup
        this.game.physics.p2.enable(this.ingame);
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
        var nextStep = this.program.getMove();
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

var programm = {
    instructions:[
        {
            instruction: 'n',
            moves: 70
        },
        {
            instruction: 's',
            moves: 30
        },
        {
            instruction: 'e',
            moves: 30
        },
        {
            instruction: 'l',
            moves: 150
        },
        {
            instruction: 'e',
            moves: 60
        },
        {
            instruction: 's',
            moves: 100
        }
    ],
    getMove:function(){
        if(this.current === undefined || this.current.moves==0)
            this.current = this.instructions.pop();

        if(this.current === undefined)
            return 'end';

        this.current.moves--;

        return this.current.instruction;
    }
};

var obstacleFactory = {
    preload: function(game) {
        this.game = game;
        game.load.image('obstacle', 'sprites/shinyball.png');
        this.obstacles = game.add.physicsGroup(Phaser.Physics.P2JS);
    },
    create: function(x, y){
        var ingame = this.obstacles.create(x, y, 'obstacle');
        ingame.body.setCircle(16);

        return ingame;
    }
};

var game = new Phaser.Game(
    800,
    600,
    Phaser.CANVAS,
    'logorobot',
    {
        preload: preload,
        create: create,
        update: update
    }
);

function preload() {
    robot.preload(game);
    obstacleFactory.preload(game);
}

var customBounds;
var isRunning = false;

function run(){
    isRunning = true;
}

function create() {
    //  The bounds of our physics simulation
    var bounds = new Phaser.Rectangle(50, 50, 500, 500);

    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.restitution = 0.9;

    var obstacles = [
      obstacleFactory.create(bounds.x + 30, bounds.y + 100),
      obstacleFactory.create(bounds.x + 180, bounds.y + 150),
      obstacleFactory.create(bounds.x + 180, bounds.y + 250),
      obstacleFactory.create(bounds.x + 180, bounds.y + 80)
    ];

    robot.create(bounds.x + 30, bounds.y + 30);
    robot.setProgram(programm);

    //  Create a new custom sized bounds, within the world bounds
    customBounds = { left: null, right: null, top: null, bottom: null };

    createPreviewBounds(bounds.x, bounds.y, bounds.width, bounds.height);

    //  Just to display the bounds
    var graphics = game.add.graphics(bounds.x, bounds.y);
    graphics.lineStyle(4, 0xffd900, 1);
    graphics.drawRect(0, 0, bounds.width, bounds.height);
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
    if(isRunning)
        robot.step();
}