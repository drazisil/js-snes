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
        this.mem = new jsMemMapper(this.cart);
        this.cpu.mem = this.mem;
    } else {
        debug('ERROR: System halted.');
    }
};

jsSNESSystem.prototype.POST = function() {
    if (jsMemMapper) {
        //debug('SYSTEM: Memory mapper available.');
    }
    if (jsPPU) {
        //debug('SYSTEM: PPU available.');
    }
    if (jsW65C816S) {
        //debug('SYSTEM: CPU available.');
    }
    if ((jsMemMapper & jsPPU & jsW65C816S & ArrayBuffer & Uint8Array) === 0) {
        debug('SYSTEM: POST passed.');
        return true;
    } else {
        debug('SYSTEM: POST failed.');
        return false;

    }
};

jsSNESSystem.prototype.run = function(maxCycles) {
    this.maxCycles = maxCycles;
    debug('Running for ' + this.maxCycles + ' cycles.');

    //Init
    // Set D to $00
    this.cpu.registers.D = new Uint8Array(new ArrayBuffer(2));
    this.cpu.registers.D[0] = 0;
    this.cpu.registers.D[1] = 0;

    // Set PC to $8000
    this.cpu.registers.PC = new Uint8Array(new ArrayBuffer(2));
    this.cpu.registers.PC[0] = hex2dec('00');
    this.cpu.registers.PC[1] = hex2dec('80');

    // Set S to $1FF
    this.cpu.registers.S = new Uint8Array(new ArrayBuffer(2));
    this.cpu.registers.S[0] = hex2dec('01');
    this.cpu.registers.S[1] = hex2dec('FF');

    // Fetch, Decode, Execute
    for (i = 0; i < this.maxCycles; i++) {
        //Fetch
        opcodeHex = this.mem.readByteHex(this.cpu.registers.D, this.cpu.registers.PC);
        this.cpu.incPC();

        //Decode
        opcode = this.cpu.decodeOpcode(opcodeHex);
        if (opcode === false)
        {
            debug('FATAL ERROR: error decoding opcode. ' + opcodeHex);
            return false;
        }

        //Execute
        ret = this.cpu[opcode](this.mem, opcodeHex);
        if (ret === false)
        {
            debug('FATAL ERROR: error executing opcode. ' + opcodeHex);
            return false;
        }
        debug(opcode);

    }

}

/*
 * Utility functions
 */
function debug(data) {
    if (debugMode === true) {
        console.log(data);
    }
}
