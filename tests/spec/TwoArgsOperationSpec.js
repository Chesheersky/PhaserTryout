describe("TwoArgsOperation", function () {
    var twoArgsOperation;

    beforeEach(function () {
        twoArgsOperation = new TwoArgsOperation();
    });

    describe("when validated", function () {
        describe("simple cases", function () {
            it("should return true for 'a + b'", function () {
                var given = "a + b";
                var result = twoArgsOperation.isValid(given);
                expect(result).toBeTruthy();
            });
            it("should return true for 'a + 3832'", function () {
                var given = "a + 3832";
                var result = twoArgsOperation.isValid(given);
                expect(result).toBeTruthy();
            });
            it("should return true for '3932 + b'", function () {
                var given = "3932 + b";
                var result = twoArgsOperation.isValid(given);
                expect(result).toBeTruthy();
            });
            it("should return true for '3932 + 3993'", function () {
                var given = "3932 + 3993";
                var result = twoArgsOperation.isValid(given);
                expect(result).toBeTruthy();
            });
            it("should return false for 'a++'", function () {
                var given = "a++";
                var result = twoArgsOperation.isValid(given);
                expect(result).toBeFalsy();
            });
        });
        describe("complex cases", function () {
            it("should return true for a + b + c", function () {
                var given = "a + b + c";
                var result = twoArgsOperation.isValid(given);
                expect(result).toBeTruthy();
            });
            it("should return true for a + 456 + c", function () {
                var given = "a + b + c";
                var result = twoArgsOperation.isValid(given);
                expect(result).toBeTruthy();
            });
            it("should return true for a + 777 + 456 + c", function () {
                var given = "a + b + c";
                var result = twoArgsOperation.isValid(given);
                expect(result).toBeTruthy();
            });
        });
    });

    describe("when parsed", function () {
        describe("a + b", function () {
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
        describe("a + 373", function () {
            var given = "a + 373"
            it("should return type twoArgsOperation", function () {
                var result = twoArgsOperation.parse(given);
                expect(result.type).toEqual("twoArgsOperation");
            });
            it("should return right with type numeric", function () {
                var result = twoArgsOperation.parse(given);
                expect(result.right.type).toEqual("numeric");
            });
            it("should return right with value 373", function () {
                var result = twoArgsOperation.parse(given);
                expect(result.right.value).toEqual(373);
            });
        });
        describe("373 + b", function () {
            var given = "373 + b"
            it("should return type twoArgsOperation", function () {
                var result = twoArgsOperation.parse(given);
                expect(result.type).toEqual("twoArgsOperation");
            });
            it("should return left with type numeric", function () {
                var result = twoArgsOperation.parse(given);
                expect(result.left.type).toEqual("numeric");
            });
            it("should return left with value 373", function () {
                var result = twoArgsOperation.parse(given);
                expect(result.left.value).toEqual(373);
            });
        });
        describe("a + b + c", function () {
            var given = "a + b + c";
            var result;
            beforeEach(function () {
                result = twoArgsOperation.parse(given);
            });
            it("should return type twoArgsOperation", function () {
                expect(result.type).toEqual("twoArgsOperation");
            });
            it("should return left with type variable", function () {
                expect(result.left.type).toEqual("variable");
            });
            it("should return left with name a", function () {
                expect(result.left.name).toEqual("a");
            });
            it("should return operation with type plus", function () {
                expect(result.operation.type).toEqual("plus");
            });
            describe("the right part of the operation", function () {
                var target;
                beforeEach(function () {
                    target = result.right;
                });
                it("should have type twoArgsOperation", function () {
                    expect(target.type).toEqual("twoArgsOperation");
                });
                it("should have left type variable", function () {
                    expect(target.left.type).toEqual("variable");
                });
                it("should have right type variable", function () {
                    expect(target.right.type).toEqual("variable");
                });
                it("should have left name b", function () {
                    expect(target.left.name).toEqual("b");
                });
                it("should have right name c", function () {
                    expect(target.right.name).toEqual("c");
                });
            });
        });
    })
        ;
    });
