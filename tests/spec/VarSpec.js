describe("Variable", function() {
    var variable;

    beforeEach(function() {
        variable = new Variable();
    });
//todo implement with validation
//    describe("when is asked if a given string is a variable", function() {
//        it("should recognize 'hello' as valid", function() {
//            var result = variable.isValid("hello");
//            expect(result).toEqual(true);
//        });
//
//        it("should recognize '_hello' as valid", function() {
//            var result = variable.isValid("_hello");
//            expect(result).toEqual(true);
//        });
//
//        it("should recognize 'hello5' as valid", function() {
//            var result = variable.isValid("hello5");
//            expect(result).toEqual(true);
//        });
//
//        it("should recognize 'Hello' as valid", function() {
//            var result = variable.isValid("Hello");
//            expect(result).toEqual(true);
//        });
//
//        it("should recognize '$hello' as valid", function() {
//            var result = variable.isValid("$hello");
//            expect(result).toEqual(true);
//        });
//
//        it("shouldn't recognize '2hello' as valid", function() {
//            var result = variable.isValid("2hello");
//            expect(result).toEqual(false);
//        });
//
//        it("shouldn't recognize 'hello%' as valid", function() {
//            var result = variable.isValid("hello%");
//            expect(result).toEqual(false);
//        });
//
//        it("shouldn't recognize 'hell§o' as valid", function() {
//            var result = variable.isValid("hell§o");
//            expect(result).toEqual(false);
//        });
//
//        it("shouldn't recognize 'he(%llo' as valid", function() {
//            var result = variable.isValid("he(%llo");
//            expect(result).toEqual(false);
//        });
//
//        it("shouldn't recognize 'he.llo' as valid", function() {
//            var result = variable.isValid("he.llo");
//            expect(result).toEqual(false);
//        });
//
//        it("shouldn't recognize 'he;llo' as valid", function() {
//            var result = variable.isValid("he;llo");
//            expect(result).toEqual(false);
//        });
//    });

    describe("when parsed", function(){
        it("should return input as a name", function() {
            var given = "some";
            var result = variable.parse(given);
            expect(result.name).toEqual(given);
        });
    });
});
