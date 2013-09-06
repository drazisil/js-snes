function jsPPU() {
    var screenWidth;
    this.screenWidth = 256;
    var screenHeight;
    this.screenHeight = 224;
    /*
     * 1 = 1 pixel/pixel
     */
    var pixelScale;
    this.pixelScale = 1;
    return true;
}

jsPPU.prototype.init = function() {
    var snesScreen_canvas = document.getElementById("snesScreen");
    snesScreen_canvas.width = this.screenWidth;
    snesScreen_canvas.height = this.screenHeight;
};

jsPPU.prototype.checkMem = function(mem) {
    debug('PPU: Checking memory for changes');
    
    debug('$2100 = '+mem.readByteHex(['00','00'], ['00','21']));
    
    
};

jsPPU.prototype.checkSDR = function(memoryHandler) {
    sdr = memoryHandler.read(8448);
    debug('PPU: Current state of the Screen Display Register: ' + sdr);
    /*
     * $80 = Screen Off
     */
    if (sdr & 128) {
        debug('PPU: Screen is on');
    } else {
        debug('PPU: Screen is off');

    }
}