function cartridge() {
    this.state = false;
}

cartridge.prototype.insert = function(path) {
    this.path = path;
    var oReq = new XMLHttpRequest();
    oReq.open("GET", this.path, true);
    oReq.responseType = "arraybuffer";
    me = this;
    oReq.onload = function(oEvent) {
        var arrayBuffer = oReq.response; // Note: not oReq.responseText
        if (arrayBuffer) {
            me.ROMmemory = new Uint8Array(arrayBuffer);
            me.state = true;
            console.log('Loaded Cartridge: '+me.path);
        }
    };

    oReq.send(null);
}