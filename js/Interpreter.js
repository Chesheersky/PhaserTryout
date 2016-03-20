define(function () {
    var exports = {
        interprete: function (code) {
            var instructions = code.split('\n').map(parseLine);

            function parseLine(line) {
                var split = line.split(' ');
                var result =
                {
                    instruction: split[0],
                    moves: split[1]
                };
                return result;
            };

            return {
                instructions: instructions,
                getMove: function () {
                    if (this.current === undefined || this.current.moves == 0)
                        this.current = this.instructions.shift();

                    if (this.current === undefined)
                        return 'end';

                    this.current.moves--;

                    return this.current.instruction;
                }
            };
        }
    };

    return exports;
});