function Numeric() {}
//todo implement this one =)
function isNan(val){
    return !(val < 0)
        && !(val > 0)
        && !(val == 0);
}

Numeric.prototype.isValid = function (str){
    //todo check if we have numbers only with regex instead of this perverse
    if(str == undefined)
        return false;
    var value = parseInt(str.trim());

    return !isNan(value)
        && (''+ value).length == str.length;
};
Numeric.prototype.parse = function (str){
    return {
        type:"numeric",
        value:parseInt(str.trim())
    };
};