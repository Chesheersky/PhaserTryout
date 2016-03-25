describe("Plus", function() {
    var plus;

    beforeEach(function() {
        plus = new Plus();
    });

    describe("when validated", function(){
        it("should return true for ' + '", function() {
            var given = " + ";
            var result = plus.isValid(given);
            expect(result).toBeTruthy();
        });
        it("should return true for '+ '", function() {
            var given = "+ ";
            var result = plus.isValid(given);
            expect(result).toBeTruthy();
        });
        it("should return true for ' +'", function() {
            var given = " +";
            var result = plus.isValid(given);
            expect(result).toBeTruthy();
        });
        it("should return true for '+'", function() {
            var given = "+";
            var result = plus.isValid(given);
            expect(result).toBeTruthy();
        });
        it("should return false for '-'", function() {
            var given = "-";
            var result = plus.isValid(given);
            expect(result).toBeFalsy();
        });
    });

    describe("when parsed", function(){
        it("should return type plus", function() {
            var result = plus.parse("+");
            expect(result.type).toEqual("plus");
        });
    });
});
