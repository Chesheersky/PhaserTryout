var ObstacleFactory = function (game) {

    this.game = game;
    game.load.image('obstacle', 'sprites/shinyball.png');
    this.obstacles = game.add.physicsGroup(Phaser.Physics.P2JS);

    this.produce = function(x, y){
        var ingame = this.obstacles.create(x, y, 'obstacle');
        ingame.body.setCircle(16);

        return ingame;
    }

    return this;
};