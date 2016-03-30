function TwoArgsOperation() {
};
function any(list, expression) {
    var result = false;
    list.forEach(function (x) {
        result = result || expression(x);
    });
    return result;
};
function last(list, expression) {
    var result;
    list.forEach(function (x) {
        if (expression(x))
            result = x;
    });
    return result;
};
function splitExpression(str) {
    //todo take care of spaceless syntax
    var split = str.split(' ');

    if (split.length > 3)
        return [
            split[0],
            split[1],
            str.substr(split[0].length + split[1].length + 2)
        ];
    else
        return split;
};

var operations = [
    new Plus()//, new Minus(), new Divide(), new Multiply(), new Equals(),
];
var leftArguments = [
    new Variable(), new Numeric()
];
var rightArguments = [
    new Variable(), new Numeric(), new TwoArgsOperation()
];

TwoArgsOperation.prototype.isValid = function (str) {
    if(str == undefined)
        return false;

    var split = splitExpression(str);
    var left = split[0];
    var operation = split[1];
    var right = split[2];

    var result = any(leftArguments, function (x) {
            return x.isValid(left);
        })
        && any(operations, function (x) {
            return x.isValid(operation);
        })
        && any(rightArguments, function (x) {
            return x.isValid(right);
        });

    return result;
};
TwoArgsOperation.prototype.parse = function (str) {
    var split = splitExpression(str);
    var left = split[0];
    var operation = split[1];
    var right = split[2];

    left = last(leftArguments, function (x) {
        return x.isValid(left);
    }).parse(left);
    operation = last(operations, function (x) {
        return x.isValid(operation);
    }).parse(operation);
    right = last(rightArguments, function (x) {
        return x.isValid(right);
    }).parse(right);

    return {
        type: "twoArgsOperation",
        left: left,
        operation: operation,
        right: right,
    };
};