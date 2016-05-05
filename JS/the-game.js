define(['phaser', './robot', './obstacle-factory', './interpreter'], function (Phaser, robot, obstacleFactory, interpreter) {
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

    var customBounds;
    var isRunning = false;


    function preload () {
        robot.preload(game);
        obstacleFactory.preload(game);
    };

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
    };

    function create() {
        //todo move the bounds to a separate class
        var bounds = new Phaser.Rectangle(50, 50, 500, 500);

        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.restitution = 0.9;

        var obstacles = [
            obstacleFactory.produce(bounds.x + 30, bounds.y + 100),
            obstacleFactory.produce(bounds.x + 180, bounds.y + 150),
            obstacleFactory.produce(bounds.x + 180, bounds.y + 250),
            obstacleFactory.produce(bounds.x + 180, bounds.y + 80)
        ];

        robot.initialize(bounds.x + 30, bounds.y + 30);

        //  Create a new custom sized bounds, within the world bounds
        customBounds = { left: null, right: null, top: null, bottom: null };

        createPreviewBounds(bounds.x, bounds.y, bounds.width, bounds.height);

        //  Just to display the bounds
        var graphics = game.add.graphics(bounds.x, bounds.y);
        graphics.lineStyle(4, 0xffd900, 1);
        graphics.drawRect(0, 0, bounds.width, bounds.height);
    };

    function update() {
        if(isRunning)
            robot.step();
    };

    var exports =
    {
        start: function(code){
            var program = interpreter.interprete(code);
            robot.setProgram(program);
            isRunning = true;
        }
    };
    return exports;
});