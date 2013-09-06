/*
 * This is the system board
 */
function jsSNESSystem() {

}

jsSNESSystem.prototype.powerOn = function() {
    if (this.POST()) {
        this.cpu = new jsW65C816S();
        this.cpu.Reset();
        this.cart = new cartridge();
        this.mem = new jsMemMapper();
    } else {
        console.log('ERROR: System halted.');
    }
};

jsSNESSystem.prototype.POST = function() {
    if (jsAjHD) {
        //console.log('SYSTEM: Hard Drive available.');
    }
    if (jsMemMapper) {
        //console.log('SYSTEM: Memory mapper available.');
    }
    if (jsPPU) {
        //console.log('SYSTEM: PPU available.');
    }
    if (jsW65C816S) {
        //console.log('SYSTEM: CPU available.');
    }
    if ((jsAjHD & jsMemMapper & jsPPU & jsW65C816S) === 0) {
        console.log('SYSTEM: POST passed.');
        return true;
    } else {
        console.log('SYSTEM: POST failed.');
        return false;

    }
};

jsSNESSystem.prototype.run = function(maxCycles) {
    this.maxCycles = maxCycles;
    console.log('Running for ' + this.maxCycles + ' cycles.');
}
