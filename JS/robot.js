define(function () {
    var exports = {
        constants: {
            SPEED: 100,
            ROTATION_SPEED: 20,
        },
        preload: function (game) {
            this.game = game;
            this.game.load.spritesheet('robot', 'sprites/humstar.png', 32, 32);
        },
        initialize: function (x, y) {
            this.ingame = this.game.add.sprite(x, y, 'robot');
            this.ingame.scale.set(2);
            this.ingame.smoothed = false;
            this.ingame.animations.add('fly', [0, 1, 2, 3, 4, 5], 10, true);
            this.ingame.play('fly');

            //  Create our physics body. A circle assigned the playerCollisionGroup
            this.game.physics.p2.enable(this.ingame);
            this.ingame.body.setRectangle(56, 56);
        },

        stop: function () {
            this.ingame.body.setZeroVelocity();
            this.ingame.body.setZeroRotation();
        },

        north: function () {
            this.ingame.body.moveUp(this.constants.SPEED);
        },
        south: function () {
            this.ingame.body.moveDown(this.constants.SPEED);
        },
        west: function () {
            this.ingame.body.moveLeft(this.constants.SPEED);
        },
        east: function () {
            this.ingame.body.moveRight(this.constants.SPEED);
        },
        left: function () {
            this.ingame.body.rotateLeft(this.constants.ROTATION_SPEED);
        },
        right: function () {
            this.ingame.body.rotateRight(this.constants.ROTATION_SPEED);
        },

        setProgram: function (program) {
            this.program = program;
        },

        step: function () {
            this.stop();
            var nextStep = this.program.getMove();
            switch (nextStep) {
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

    return exports;
});