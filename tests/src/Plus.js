function Plus(){}
Plus.prototype.isValid = function (str){
    //todo use something as an attribute to check for undefined
    if(str==undefined)
        return false;
    return str.trim() == "+";
};
Plus.prototype.parse = function (str) {
    return {
        type:"plus"
    };
};