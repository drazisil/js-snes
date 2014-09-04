
function cartridge() {
    "use strict";
    this.state = false;
}

cartridge.prototype.insert = function (path) {
    "use strict";
    this.path = path;
    var me, oReq = null;
    this.oReq = new XMLHttpRequest();
    this.oReq.open("GET", this.path, true);
    this.oReq.responseType = "arraybuffer";
    me = this;
    this.oReq.onload = function () {
        var arrayBuffer = me.oReq.response; // Note: not oReq.responseText
        if (arrayBuffer) {
            me.ROMmemory = new Uint8Array(arrayBuffer);
            me.state = true;
            debug('Loaded Cartridge: ' + me.path);
        }
    };

    this.oReq.send(null);
};