define(['./theGame'], function (game) {
    window.API =
    {
        run: function () {
            var code = document.getElementById('codebox').value;
            game.start(code);
        }
    };
});