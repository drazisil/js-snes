function jsW65C816S(){
    this.opcode = new opcodes();
    this.registers = {};
    this.signals = {};
    this.flags = {};
    return true;
}

jsW65C816S.prototype.Reset = function(){
    
    // Set registers
    this.registers.D = [0,0];
    this.registers.DBR = 0;
    this.registers.PBR = 0;
    
    // Set signals
    this.signals.E = true;
    this.signals.MX = true;
    this.signals.RWB = true;
    this.signals.VDA = false;
    this.signals.VPB = true;
    this.signals.VPA = false;
    
    // Set processor register flags
    this.flags.M = true;
    this.flags.X = true;
    this.flags.D = false;
};
