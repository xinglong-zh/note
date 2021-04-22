function Minin(Demo) {
    Demo.prototype._init = function (value) {
        console.log('minin', value);
    }
}
function Before(Demo) {
    Demo.prototype._before = function (value) {
        console.log('before', value);
    }
}
function Demo(value) {
    console.log('demo', value);
    this._init(value);
    this._before(value);
}
Minin(Demo);
Before(Demo);
demo = new Demo('world');
console.log(demo);
