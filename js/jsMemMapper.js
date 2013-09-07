/**
 *
 *  Javascript string pad
 *  http://www.webtoolkit.info/
 *
 **/

var STR_PAD_LEFT = 1;
var STR_PAD_RIGHT = 2;
var STR_PAD_BOTH = 3;

function pad(str, len, pad, dir) {

    if (typeof(len) === "undefined") {
        var len = 2;
    }
    if (typeof(pad) === "undefined") {
        var pad = '0';
    }
    if (typeof(dir) === "undefined") {
        var dir = STR_PAD_LEFT;
    }

    if (len + 1 >= str.length) {

        switch (dir) {

            case STR_PAD_LEFT:
                str = Array(len + 1 - str.length).join(pad) + str;
                break;

            case STR_PAD_BOTH:
                var right = Math.ceil((padlen = len - str.length) / 2);
                var left = padlen - right;
                str = Array(left + 1).join(pad) + str + Array(right + 1).join(pad);
                break;

            default:
                str = str + Array(len + 1 - str.length).join(pad);
                break;

        } // switch

    }

    return str;
}

function dec2hex(mem) {
    if (mem < 0)
    {
        mem = 0xFFFFFFFF + mem + 1;
    }

    hex = pad(mem.toString(16).toUpperCase());
    return hex;
}

function hex2dec(hex, len) {
    if (hex === 0) {
        return pad(hex, len);
    } else {
        dec = pad(parseInt(hex.toUpperCase(), 16), len);
        return dec;
    }
}

function jsMemMapper(cartridge) {

    this.rawCart = cartridge;
    
    return true;

}

jsMemMapper.prototype.stripSMCHeader = function() {

    this.rawCart.ROMmemory = this.rawCart.ROMmemory.subarray(512);

};

jsMemMapper.prototype.rom2snes = function(addr) {

    switch (this.romLayout) {
        case 32:
            {
                addr = ((addr & 0x7f8000) << 1) + 0x8000 + (addr & 0x7fff);
            }
            break;

        case 32:
            {
                addr = 0xc00000 + (addr & 0x3fffff);
            }
            break;
    }

    return addr;
};

jsMemMapper.prototype.snes2rom = function(addr) {
    switch (this.romLayout) {
        case 32:
            {
                addr = ((addr & 0x7f0000) >> 1) + (addr & 0x7fff);
            }
            break;

        case 33:
            {
                addr = addr & 0x3fffff;
            }
            break;
    }

    return addr;
};

jsMemMapper.prototype.readByte = function(bank, offset) {
    hexAddr = dec2hex(bank[0]) + dec2hex(offset[1]) + dec2hex(offset[0]);
    //debug(hexAddr);
    return this.rawCart.ROMmemory[ this.snes2rom(hex2dec(hexAddr))  ];
};

jsMemMapper.prototype.readByteHex = function(bank, offset) {
    hexAddr = dec2hex(bank[0]) + dec2hex(offset[1]) + dec2hex(offset[0]);
    //debug(hexAddr);
    return dec2hex(this.rawCart.ROMmemory[ this.snes2rom(hex2dec(hexAddr))  ]);
};

jsMemMapper.prototype.writeByte = function(bank, offset, data) {
    hexAddr = dec2hex(bank[0]) + dec2hex(offset[1]) + dec2hex(offset[0]);
    //debug(hexAddr);
    this.rawCart.ROMmemory[ this.snes2rom(hex2dec(hexAddr))  ] = data;
};


jsMemMapper.prototype.init = function() {

    // First, do we have an SMC header?
    if (this.rawCart.ROMmemory.byteLength % 1024 === 512) {
        // Get rid of it
        this.stripSMCHeader();
    }

    debug(this.rawCart.ROMmemory.byteLength);

    // Assume LoROM in case we can't detect
    this.romLayout = 32

    title = String.fromCharCode(this.rawCart.ROMmemory[32704]) + String.fromCharCode(this.rawCart.ROMmemory[32705]) + String.fromCharCode(this.rawCart.ROMmemory[32706]);
    var re = new RegExp('[^\\u0000-\\u007f]');
    if (re.test(title) === false) {
        debug('RomLayout: LoROM');
        this.RomSize = this.rawCart.ROMmemory[32727];
        debug('ROM Size: ' + this.RomSize);

    } else {
        //Set RomLayout to HiRom
        this.romLayout = 33
        debug('RomLayout: HiROM');
    }

};