var Program = function (code){
    this.parseLine = function(line){
        var instruction='', value=0;
        [instruction, value] = line.split(' ');
        var result =
        {
            instruction: instruction,
            moves: value
        };
        return result;
    };

    this.isntructions = code.split('\n').map(this.parseLine);

    this.getMove = function(){
        if(this.current === undefined || this.current.moves==0)
            this.current = this.isntructions.shift();

        if(this.current === undefined)
            return 'end';

        this.current.moves--;

        return this.current.instruction;
    }

    return this;
};