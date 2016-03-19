var Robot = function(game) {

    this.game = game;
    this.game.load.spritesheet('robot', 'sprites/humstar.png', 32, 32);

    this.constants = {
        SPEED : 100,
        ROTATION_SPEED: 20,
    };

    this.stop = function(){
        this.ingame.body.setZeroVelocity();
        this.ingame.body.setZeroRotation();
    };

    this.initialize = function(x, y){
        this.ingame = this.game.add.sprite(x, y, 'robot');
        this.ingame.scale.set(2);
        this.ingame.smoothed = false;
        this.ingame.animations.add('fly', [0,1,2,3,4,5], 10, true);
        this.ingame.play('fly');

        //  Create our physics body. A circle assigned the playerCollisionGroup
        this.game.physics.p2.enable(this.ingame);
        this.ingame.body.setRectangle(56, 56);
    };

    this.north = function(){
        this.ingame.body.moveUp(this.constants.SPEED);
    };
    this.south = function(){
        this.ingame.body.moveDown(this.constants.SPEED);
    };
    this.west = function(){
        this.ingame.body.moveLeft(this.constants.SPEED);
    };
    this.east = function(){
        this.ingame.body.moveRight(this.constants.SPEED);
    };
    this.left = function(){
        this.ingame.body.rotateLeft(this.constants.ROTATION_SPEED);
    };
    this.right = function(){
        this.ingame.body.rotateRight(this.constants.ROTATION_SPEED);
    };
    this.setProgram = function(program){
        this.program = program;
    },

    this.step = function(){
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

    return this;
};
