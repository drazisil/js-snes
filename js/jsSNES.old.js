/*
 * 
 * This file is not currently being used. It was changed to jsSNESSystem.js
 */
/*
 * 
 * @param {type} data
 * @returns {undefined}
 */
function debug(data) {
    if (debugMode === true) {
        console.log(data);
    }
}

function jsSNES(jsMemMapper, jsPpu) {

    this.ppu = jsPpu;
    this.mem = jsMemMapper;

    this.initRegisters();
    this.initFlags();

    this.maxCycles = null;
}

/*
 * We run the registers in native. 
 * The Emulator will not tell the program this are not 8-bit, so this is not an issue
 * @returns {undefined}
 */
jsSNES.prototype.initRegisters = function() {
    this.regs = {};
    this.regs.A = new Uint8Array(2);
    this.regs.X = new Uint8Array(2);
    this.regs.Y = new Uint8Array(2);
    this.regs.PC = new Uint8Array(2);
    this.regs.S = new Uint8Array(2);
    this.regs.D = new Uint8Array(1);
};

jsSNES.prototype.initFlags = function() {

    this.flags = {};
    this.flags.E = true;
    this.flags.N = false;
    this.flags.V = false;
    this.flags.M = true;
    this.flags.X = true;
    this.flags.D = false;
    this.flags.I = true;
    this.flags.Z = false;
    this.flags.C = false;
};

jsSNES.prototype.readByte = function() {
    byte = this.mem.readByte(this.regs.D, this.regs.PC);
    this.incPC();
    return byte;
};

jsSNES.prototype.fetchOpcode = function() {
    opcode = this.mem.readByteHex(this.regs.D, this.regs.PC);
    this.incPC();
    return opcode;

};

jsSNES.prototype.toggleFlag = function(flag) {

    if (this.flags[flag] === true) {
        this.flags[flag] = false;
    } else {
        this.flags[flag] = true;
    }
};

jsSNES.prototype.checkBits = function(bits, value) {
    if ((bits & value) > 0) {
        return true;
    } else {
        return false;
    }
};

/*
 * Processes hex Opcode
 */
jsSNES.prototype.doOpcode = function(opcodeHex) {

    switch (opcodeHex) {
        case '10':
            // 10 | BPL nearlabel | Branch if Plus
            PC = hex2dec(dec2hex(this.regs.PC[1]) + dec2hex(this.regs.PC[0]));
            offset = this.readByte();

            if (this.flags.N === false) {
                if (this.checkBits(offset, hex2dec('80'))) {
                    newPC = dec2hex((PC - ~hex2dec('FF' + dec2hex(offset)))).substr(1);
                    LB = newPC.substr(2);
                    HB = newPC.substr(0, 2);
                    this.regs.PC[0] = hex2dec(LB);
                    this.regs.PC[1] = hex2dec(HB);
                    //debug(newPC);
                } else {
                    newPC = dec2hex((PC - hex2dec('00' + dec2hex(offset)))).substr(1);
                    LB = newPC.substr(2);
                    HB = newPC.substr(0, 2);
                    this.regs.PC[0] = hex2dec(LB);
                    this.regs.PC[1] = hex2dec(HB);
                    //debug(newPC);
                }
            }
            //debug('X: ' + this.regs.X[1] + ' ' + this.regs.X[0]);
            //debug('BPL nearlabel: ' + HB + LB);
            break;
        case '18':
            // 18 | CLC | Clear Carry
            this.flags.C = false;
            debug('CLC');
            break;
        case '1B':
            // 1B | TCS | Transfer 16-bit Accumulator to Stack Pointer
            this.regs.S[0] = this.regs.A[0];
            this.regs.S[1] = this.regs.A[1];
            debug('TCS');
            break;
        case '38':
            // 38 | SEC | Set Carry Flag
            this.flags.C = true;
            debug('SEC');
            break;
        case '5B':
            // 5B | TCD | Transfer 16-bit Accumulator to Direct Page Register
            this.regs.D[0] = this.regs.A[0];
            this.regs.D[1] = this.regs.A[1];
            debug('TCD');
            break;
        case '78':
            // 78 | SEI | Set Interrupt Disable Flag
            this.flags.I = true;
            debug('SEI');
            break;
        case '8D':
            // 8D | STA addr | Store Accumulator to Memory
            LB = this.readByte();
            HB = this.readByte();
            this.mem.writeByte(this.regs.D, [LB, HB], this.regs.A[0]);
            if (this.flags.M === false) {
                this.mem.writeByte(this.regs.D, this.incOffset([LB, HB]), this.regs.A[1]);
            }

            // Check if we just changed memory VRAM
            this.ppu.checkMem(this.mem);
            debug('STA addr');
            break;
        case '8F':
            // 8F | STA long | Store Accumulator to Memory
            LB = this.readByte();
            HB = this.readByte();
            DB = this.readByte();
            this.mem.writeByte([DB], [LB, HB], this.regs.A[0]);
            this.mem.writeByte([DB], this.incOffset([LB, HB]), this.regs.A[1]);

            // Check if we just changed memory VRAM
            this.ppu.checkMem(this.mem);
            debug('STA long');
            break;
        case '98':
            // 98 | TYA | Transfer Index Register Y to Accumulator
            this.regs.A[0] = this.regs.Y[0];
            this.regs.A[1] = this.regs.Y[1];
            debug('TYA');
            break;
        case '9C':
            // 9C | STZ addr | Store Zero to Memory
            LB = this.readByte();
            HB = this.readByte();
            this.mem.writeByte(this.regs.D, [LB, HB], 0);
            if (this.flags.M === false) {
                this.mem.writeByte(this.regs.D, this.incOffset([LB, HB]), 0);
            }
            debug('STZ');
            break;
        case '9F':
            // 9F | STA long,X | Store Accumulator to Memory
            LB = this.readByte();
            HB = this.readByte();
            DB = this.readByte();
            offset = this.addHexLongIndex([LB, HB, DB], this.regs.X);
            LB = offset[0];
            HB = offset[1];
            DB = offset[2];
            this.mem.writeByte([DB], [LB, HB], this.regs.A[0]);
            this.mem.writeByte([DB], this.incOffset([LB, HB]), this.regs.A[1]);

            // Check if we just changed memory VRAM
            this.ppu.checkMem(this.mem);
            debug('STA long,X');

            break;
        case 'A0':
            // A0 | LDY #const | Load Index Register Y from Memory
            LB = this.readByte();
            if (this.flags.M === false) {
                HB = this.readByte();
            }
            this.regs.Y[0] = LB;
            if (this.flags.M === false) {
                this.regs.Y[1] = HB;
                debug('LDY (16)' + [LB, HB]);

            } else {
                debug('LDY (8)' + [LB]);
            }
            break;
        case 'A2':
            // A2 | LDX #const | Load Index Register X from Memory
            LB = this.readByte();
            if (this.flags.M === false) {
                HB = this.readByte();
            }
            this.regs.X[0] = LB;
            if (this.flags.M === false) {
                this.regs.X[1] = HB;
                debug('LDX (16)' + [LB, HB]);

            } else {
                debug('LDX (8)' + [LB]);
            }
            break;
        case 'A8':
            // A8 | TAY | Transfer Accumulator to Index Register Y
            this.regs.Y[0] = this.regs.A[0];
            this.regs.Y[1] = this.regs.A[1];
            debug('TAY');

            break;
        case 'A9':
            // A9 | LDA #const | Load Accumulator from Memory
            LB = this.readByte();
            if (this.flags.M === false) {
                HB = this.readByte();
            }
            this.regs.A[0] = LB;
            if (this.flags.M === false) {
                this.regs.A[1] = HB;
                debug('LDA (16)' + [LB, HB]);

            } else {
                debug('LDA (8)' + [LB]);
            }
            break;
        case 'C2':
            // C2 | REP #const | Reset Processor Status Bits
            bits = this.readByte();
            // N = $80
            if (this.checkBits(bits, 128)) { this.flags.N = false; }
            debug('Flag N: ' + this.checkBits(bits, 128));
            // V = $40
            if (this.checkBits(bits, 64)) { this.flags.V = false; }
            debug('Flag V: ' + this.checkBits(bits, 64));
            // M = $20
            if (this.checkBits(bits, 32)) { this.flags.M = false; }
            debug('Flag M: ' + this.checkBits(bits, 32));
            // X = $10
            if (this.checkBits(bits, 16)) { this.flags.X = false; }
            debug('Flag X: ' + this.checkBits(bits, 16));
            // D = $08
            if (this.checkBits(bits, 8)) { this.flags.D = false; }
            debug('Flag D: ' + this.checkBits(bits, 8));
            // I = 04
            if (this.checkBits(bits, 4)) { this.flags.I = false; }
            debug('Flag I: ' + this.checkBits(bits, 4));
            // Z = $02
            if (this.checkBits(bits, 2)) { this.flags.Z = false; }
            debug('Flag Z: ' + this.checkBits(bits, 2));
            // C = $01
            if (this.checkBits(bits, 1)) { this.flags.C = false; }
            debug('Flag C: ' + this.checkBits(bits, 1));
            debug('REP');
            break;
        case 'CA':
            // CA | DEX | Decrement Index Register X
            this.regs.X = this.decOffset(this.regs.X);
            debug('DEX: ' + this.regs.X[1] + ' ' + this.regs.X[0]);
            break;
        case 'FB':
            // FB | XCE | Exchange Carry and Emulation Flags
            if (this.flags.E === true) {
                // Switch from Emu to Native
                oldE = this.flags.E;
                oldC = this.flags.C;
                this.flags.E = oldC;
                this.flags.C = oldE;
                this.flags.M = true;
                this.flags.X = true;
            } else {
                // Switch from Native to Emu
                oldE = this.flags.E;
                oldC = this.flags.C;
                this.flags.E = oldC;
                this.flags.C = oldE;
                this.flags.M = false;
                this.flags.X = false;
            }
            debug('XCE');
            break;
        case 'E2':
            // C2 | REP #const | Reset Processor Status Bits
            bits = this.readByte();
            // N = $80
            if (this.checkBits(bits, 128)) { this.flags.N = true; }
            debug('Flag N: ' + this.checkBits(bits, 128));
            // V = $40
            if (this.checkBits(bits, 64)) { this.flags.V = true; }
            debug('Flag V: ' + this.checkBits(bits, 64));
            // M = $20
            if (this.checkBits(bits, 32)) { this.flags.M = true; }
            debug('Flag M: ' + this.checkBits(bits, 32));
            // X = $10
            if (this.checkBits(bits, 16)) { this.flags.X = true; }
            debug('Flag X: ' + this.checkBits(bits, 16));
            // D = $08
            if (this.checkBits(bits, 8)) { this.flags.D = true; }
            debug('Flag D: ' + this.checkBits(bits, 8));
            // I = 04
            if (this.checkBits(bits, 4)) { this.flags.I = true; }
            debug('Flag I: ' + this.checkBits(bits, 4));
            // Z = $02
            if (this.checkBits(bits, 2)) { this.flags.Z = true; }
            debug('Flag Z: ' + this.checkBits(bits, 2));
            // C = $01
            if (this.checkBits(bits, 1)) { this.flags.C = true; }
            debug('Flag C: ' + this.checkBits(bits, 1));
            debug('REP');
            break;
        case 'E9':
            // E9 | SBC #const | Subtract with Borrow from Accumulator
            LB = this.readByte();
            HB = this.readByte();
            offset = this.subHex(this.regs.A, [LB, HB]);
            LB = offset[0];
            HB = offset[1];
            this.regs.A[0] = LB;
            this.regs.A[1] = HB;
            debug('SBC #const');
            break;
        default:
            debug('Unsupported Opcode: ' + opcodeHex);
            break;
    }

};

jsSNES.prototype.incPC = function() {
    this.incOffset(this.regs.PC);
};

jsSNES.prototype.incOffset = function(offset) {
    if (offset[1] === 255) {
        debug('End of the Offset, need next bank');
    } else {
        if (offset[0] === 255) {
            offset[0] = 0;
            offset[1]++;
        } else {
            offset[0]++;
        }
    }
    return offset;
};

jsSNES.prototype.decOffset = function(offset) {
    this.flags.Z = false;
    this.flags.N = false;
    if (offset[0] === 0) {
        if (offset[1] === 0) {
            this.flags.Z = false;
            this.flags.N = true;
            offset[0] = 128;
            offset[1] = 128;
        } else {
            offset[1]--;
            offset[0] = 128;
        }
    } else {
        if (this.checkBits(offset[1], 128) & offset[1] > 127) {
            this.flags.N = true;
            offset[0]--;

        } else {
            offset[0]--;
        }
    }
    return offset;
};

jsSNES.prototype.addHexLongIndex = function(first, second) {
    num1 = (dec2hex(first[2]) + dec2hex(first[1]) + dec2hex(first[0]));
    num2 = (dec2hex(second[1]) + dec2hex(second[0]));
    result = dec2hex(hex2dec(num1) + hex2dec(num2));
    //debug(num1 + ' + ' + num2 + ' = ' + result);
    LB = hex2dec(result.substr(2, 2));
    HB = hex2dec(result.substr(4, 2));
    DB = hex2dec(result.substr(0, 2));
    return [LB, HB, DB];
};

jsSNES.prototype.subHex = function(first, second) {
    num1 = (dec2hex(first[1]) + dec2hex(first[0]));
    num2 = (dec2hex(second[1]) + dec2hex(second[0]));
    result = dec2hex(hex2dec(num1) - hex2dec(num2));
    debug(num1 + ' - ' + num2 + ' = ' + result);
    LB = hex2dec(result.substr(0, 2));
    HB = hex2dec(result.substr(2, 2));
    if (this.flags.C === false) {
        return this.decOffset([LB, HB]);

    } else {
        return [LB, HB];
    }
    return [LB, HB];
};




jsSNES.prototype.run = function(cycleCount) {
    
    this.maxCycles = cycleCount;

    this.mem.init();

    // Set D to $00
    this.regs.D[0] = 00;

    // Set PC to $8000
    this.regs.PC[1] = hex2dec('80');
    this.regs.PC[0] = hex2dec('00');

    // Set S to $1FF
    this.regs.S[0] = hex2dec('FF');
    this.regs.S[1] = hex2dec('01');

    for (i = 0; i <= this.maxCycles; i++) {
        opcode = this.fetchOpcode();
        this.doOpcode(opcode);
    }

};