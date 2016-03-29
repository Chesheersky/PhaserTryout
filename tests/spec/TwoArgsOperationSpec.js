describe("TwoArgsOperation", function () {
    var twoArgsOperation;

    beforeEach(function () {
        twoArgsOperation = new TwoArgsOperation();
    });

    describe("when validated", function () {
        it("should return true for 'a + b'", function () {
            var given = "a + b";
            var result = twoArgsOperation.isValid(given);
            expect(result).toBeTruthy();
        });
        it("should return false for 'a++'", function () {
            var given = "a++";
            var result = twoArgsOperation.isValid(given);
            expect(result).toBeFalsy();
        });
    });

    describe("when parsed", function () {
        describe("a + b", function(){
            var given = "a + b"
            it("should return type twoArgsOperation", function () {
                var result = twoArgsOperation.parse(given);
                expect(result.type).toEqual("twoArgsOperation");
            });
            it("should return left with type variable", function () {
                var result = twoArgsOperation.parse(given);
                expect(result.left.type).toEqual("variable");
            });
            it("should return left with name a", function () {
                var result = twoArgsOperation.parse(given);
                expect(result.left.name).toEqual("a");
            });
            it("should return operation with type plus", function () {
                var result = twoArgsOperation.parse(given);
                expect(result.operation.type).toEqual("plus");
            });
            it("should return right with type variable", function () {
                var result = twoArgsOperation.parse(given);
                expect(result.right.type).toEqual("variable");
            });
            it("should return right with name b", function () {
                var result = twoArgsOperation.parse(given);
                expect(result.right.name).toEqual("b");
            });
        });
    });
});
