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
    } else {
        console.log('ERROR: System halted.');
    }
};

jsSNESSystem.prototype.POST = function() {
    if (jsMemMapper) {
        //console.log('SYSTEM: Memory mapper available.');
    }
    if (jsPPU) {
        //console.log('SYSTEM: PPU available.');
    }
    if (jsW65C816S) {
        //console.log('SYSTEM: CPU available.');
    }
    if ((jsMemMapper & jsPPU & jsW65C816S & ArrayBuffer & Uint8Array) === 0) {
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

        //Decode
        opcode = this.cpu.decodeOpcode(opcodeHex);
        if (opcode === false)
        {
            console.log('FATAL ERROR: error decoding opcode. ' + opcodeHex);
            return false;
        }

        //Execute
        ret = this.cpu[opcode](this.mem, opcodeHex);
        if (ret === false)
        {
            console.log('FATAL ERROR: error executing opcode. ' + opcodeHex);
            return false;
        }
        console.log(opcode);

    }

}
