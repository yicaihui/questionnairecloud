function Tools() {

}

Tools.prototype.guid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
Tools.prototype.eleTransJson = function (type) {
    switch (type) {
        case 'contactinfo':
            return "['input',{type:'text'}]"
    }
}
const tools = new Tools();
export default tools;
