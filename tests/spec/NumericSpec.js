describe("Numeric", function() {
    var numeric;

    beforeEach(function() {
        numeric = new Numeric();
    });

    describe("when validated", function(){
        it("should return true for '32167'", function() {
            var given = "32167";
            var result = numeric.isValid(given);
            expect(result).toBeTruthy();
        });
        it("should return false for 'abcdefg'", function() {
            var given = "abcdefg";
            var result = numeric.isValid(given);
            expect(result).toBeFalsy();
        });
        it("should return false for '1a2b3c4d5'", function() {
            var given = "1a2b3c4d5";
            var result = numeric.isValid(given);
            expect(result).toBeFalsy();
        });
        it("should return false for undefined", function() {
            var given = undefined;
            var result = numeric.isValid(given);
            expect(result).toBeFalsy();
        });
    });

    describe("when parsed", function(){
        describe("377677", function () {
            var given = "377677";

            it("should return type numeric", function() {
                var result = numeric.parse(given);
                expect(result.type).toEqual("numeric");
            });
            it("should return value equal to 377677", function() {
                var result = numeric.parse(given);
                expect(result.value).toEqual(377677
                );
            });
        });
    });
});
