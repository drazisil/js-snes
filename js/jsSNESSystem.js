/*
 * Utility functions
 */
function debug(data) {
    "use strict";
    if (window.DEBUGMODE === true) {
        console.log(data);
    }
}

/*
 * This is the system board
 */
function jsSNESSystem() {
    "use strict";
    // The main system board
    var i = 0;
    i = i + 1;
    i = null;
}

jsSNESSystem.prototype.powerOn = function () {
    "use strict";
    if (this.POST()) {
        this.cpu = new window.jsW65C816S();
        this.cpu.Reset();
        this.cart = new window.cartridge();
        this.mem = new window.jsMemMapper(this.cart);
        this.cpu.mem = this.mem;
    } else {
        debug('ERROR: System halted.');
    }
};

jsSNESSystem.prototype.POST = function () {
    "use strict";
//    if (window.jsMemMapper) {
//        //debug('SYSTEM: Memory mapper available.');
//    }
//    if (window.jsPPU) {
//        //debug('SYSTEM: PPU available.');
//    }
//    if (window.jsW65C816S) {
//        //debug('SYSTEM: CPU available.');
//    }
    if (!(window.jsMemMapper === 0)
            && (window.jsPPU === 0)
            && (window.jsW65C816S === 0)
            && (window.ArrayBuffer === 0)
            && (window.Uint8Array === 0)) {
        debug('SYSTEM: POST failed.');
        return false;
    }
    debug('SYSTEM: POST passed.');
    return true;

};

jsSNESSystem.prototype.run = function (maxCycles) {
    "use strict";
    this.maxCycles = maxCycles;
    debug('Running for ' + this.maxCycles + ' cycles.');

    //Init
    // Set D to $00
    this.cpu.registers.D = new window.Uint8Array(new window.ArrayBuffer(2));
    this.cpu.registers.D[0] = 0;
    this.cpu.registers.D[1] = 0;

    // Set PC to $8000
    this.cpu.registers.PC = new window.Uint8Array(new window.ArrayBuffer(2));
    this.cpu.registers.PC[0] = window.hex2dec('00');
    this.cpu.registers.PC[1] = window.hex2dec('80');

    // Set S to $1FF
    this.cpu.registers.S = new window.Uint8Array(new window.ArrayBuffer(2));
    this.cpu.registers.S[0] = window.hex2dec('01');
    this.cpu.registers.S[1] = window.hex2dec('FF');

    // Fetch, Decode, Execute
    for (var i = 0; i < this.maxCycles; i++) {
        //Fetch
        var opcodeHex = this.mem.readByteHex(this.cpu.registers.D, this.cpu.registers.PC);
        this.cpu.incPC();

        //Decode
        var opcode = this.cpu.decodeOpcode (opcodeHex);
        if (opcode === false) {
            debug('FATAL ERROR: error decoding opcode. ' + opcodeHex);
            return false;
        }

        //Execute
        var ret = this.cpu[opcode](this.mem, opcodeHex);
        if (ret === false)
        {
            debug('FATAL ERROR: error executing opcode. ' + opcodeHex);
            return false;
        }
        debug(opcode);

    }

};

