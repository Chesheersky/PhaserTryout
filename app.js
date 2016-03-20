requirejs.config({
    paths: {
        phaser: 'libs/phaser.min'
    },

    shim: {
        'phaser': {
            exports: 'Phaser'
        }
    }
});
requirejs(['js/Main.js']);