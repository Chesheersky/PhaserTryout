function Plus(){}
Plus.prototype.isValid = function (str){
    return str.trim() == "+";
};
Plus.prototype.parse = function (str) {
    return {
        type:"plus"
    };
};