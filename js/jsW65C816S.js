/*
 * Opcodes
 */
function opcodes() {
//Cycle Time Adjustments
//        16A: Add 1 if using 16-bit memory and accumulator
//        16B: Add 2 if using 16-bit memory and accumulator
//        B:   Add 1 if conditional branch is taken
//        C:   Add 1 if index crosses bank boundary
//        D:   Add 1 if status register's Decimal bit is set
//        I:   Add 1 if using 16-bit index registers
//        M:   Add 7 for each byte copied
//        N:   Add 1 if in native mode
//        P:   Add 1 if branch crosses page boundary in emulation mode
//        Z:   Add 1 if DP is not on a page boundary

//Instruction     Hex     Cycle Time      Status Reg.     Notes
//===============================================================================
};

opcodes.prototype.ADC = function() {
//ADC #imm        69      2 [16A,D]       nv----zc        Add memory to A with
//                                                        carry.
//ADC abs         6D      4 [16A,D]
//ADC longabs     6F      5 [16A,D]
//ADC dp          65      3 [16A,Z,D]
//ADC (dp)        72      5 [16A,Z,D]
//ADC [dp]        67      6 [16A,Z,D]
//ADC abs,X       7D      4 [16A,C,D]
//ADC abslong,X   7F      5 [16A,D]
//ADC abs,Y       79      4 [16A,C,D]
//ADC dp,X        75      4 [16A,Z,D]
//ADC (dp,X)      61      6 [16A,Z,D]
//ADC (dp),Y      71      5 [16A,Z,C,D]
//ADC [dp],Y      77      6 [16A,Z,D]
//ADC ofs,S       63      4 [16A,D]
//ADC (ofs,S),Y   73      7 [16A,D]
    console.log('Testing...');
        return true;
};
opcodes.prototype.AND = function() {
//AND #imm        29      2 [16A]         n-----z-        And A with memory.
//AND abs         2D      4 [16A]
//AND abslong     2F      5 [16A]
//AND dp          25      3 [16A,Z]
//AND (dp)        32      5 [16A,Z]
//AND [dp]        27      6 [16A,Z]
//AND abs,X       3D      4 [16A,C]
//AND abslong,X   3F      5 [16A]
//AND abs,Y       39      4 [16A,C]
//AND dp,X        35      4 [16A,Z]
//AND (dp,X)      21      6 [16A,Z]
//AND (dp),Y      31      5 [16A,Z,C]
//AND [dp],Y      37      6 [16A,Z]
//AND ofs,S       23      4 [16A]
//AND (ofs,S),Y   33      7 [16A]

// AND = &&
    return true;
};
opcodes.prototype.ASL = function() {
//ASL             0A      2               n-----zc        Shift left memory or A.
//ASL abs         0E      6 [16B]
//ASL dp          06      5 [16B,Z]
//ASL abs,X       1E      7 [16B]
//ASL dp,X        16      6 [16B,Z]
    return true;
};

opcodes.prototype.BCC = function() {
//BCC relbyte     90      2 [B,P]         --------        Branch if carry clear.
    return true;
};
opcodes.prototype.BCS = function() {
//BCS relbyte     B0      2 [B,P]         --------        Branch if carry set.
    return true;
};
opcodes.prototype.BEQ = function() {
//BEQ relbyte     F0      2 [B,P]         --------        Branch if equal (z=0).
    return true;
};
opcodes.prototype.BIT = function() {
//BIT #imm        89      2 [16A]         ------z-        Test memory with bits
//                                                        from A.
//BIT abs         2C      4 [16A]         nv----z-
//BIT dp          24      3 [16A,Z]
//BIT abs,X       3C      4 [16A,C]
//BIT dp,X        34      4 [16A,Z]    
    return true;
};
opcodes.prototype.BMI = function() {
//BMI relbyte     30      2 [B,P]         --------        Branch if minus (n=1).
    return true;
};
opcodes.prototype.BNE = function() {
//BNE relbyte     D0      2 [B,P]         --------        Branch if not equal.
    return true;
};
opcodes.prototype.BPL = function() {
//BPL relbyte     10      2 [B,P]         --------        Branch if positive.
    return true;
};
opcodes.prototype.BRA = function() {
//BRA relbyte     80      2 [P]           --------        Branch always.    
    return true;
};
opcodes.prototype.BRK = function() {
//BRK byte        00      7 [N]           ----01--        Software break
//BRK             00                      ---101--        (sets b in emulation
//                                                        mode).    
    return true;
};
opcodes.prototype.BRL = function() {
//BRL relword     82      4               --------        Branch always long.    
    return true;
};
opcodes.prototype.BVC = function() {
//BVC relbyte     50      2 [B,P]         --------        Branch if overflow
//                                                        clear.    
    return true;
};
opcodes.prototype.BVS = function() {
//BVS relbyte     70      2 [B,P]         --------        Branch if overflow set.
    return true;
};

opcodes.prototype.CLC = function() {
//CLC             18      2               -------0        Clear carry bit.
    return true;
};
opcodes.prototype.CLD = function() {
//CLD             D8      2               ----0---        Clear decimal bit.
    return true;
};
opcodes.prototype.CLI = function() {
//CLI             58      2               -----0--        Clear interrupt disable
//                                                        bit.
    return true;
};
opcodes.prototype.CLV = function() {
//CLV             B8      2               -0------        Clear overflow bit.
    return true;
};
opcodes.prototype.CMP = function() {
//CMP #imm        C9      2 [16A]         n-----zc        Compare A with memory.
//CMP abs         CD      4 [16A]
//CMP abslong     CF      5 [16A]
//CMP dp          C5      3 [16A,Z]
//CMP (dp)        D2      5 [16A,Z]
//CMP [dp]        C7      6 [16A,Z]
//CMP abs,X       DD      4 [16A,C]
//CMP abslong,X   DF      5 [16A]
//CMP abs,Y       D9      4 [16A,C]
//CMP dp,X        D5      4 [16A,Z]
//CMP (dp,X)      C1      6 [16A,Z]
//CMP (dp),Y      D1      5 [16A,Z,C]
//CMP [dp],Y      D7      6 [16A,Z]
//CMP ofs,S       C3      4 [16A]
//CMP (ofs,S),Y   D3      7 [16A]
    return true;
};
opcodes.prototype.COP = function() {
//COP byte        02      7 [N]           ----01--        Coprocessor enable.
    return true;
};
opcodes.prototype.CPX = function() {
//CPX #imm        E0      2 [I]           n-----zc        Compare X with memory.
//CPX abs         EC      4 [I]
//CPX dp          E4      3 [I,Z]
    return true;
};
opcodes.prototype.CPY = function() {
//CPY #imm        C0      2 [I]           n-----zc        Compare Y with memory.
//CPY abs         CC      4 [I]
//CPY dp          C4      3 [I,Z]
    return true;
};
opcodes.prototype.DEC = function() {
//DEC             3A      2               n------c        Decrement A or memory.
//DEC abs         CE      6 [16B]
//DEC dp          C6      5 [16B,Z]
//DEC abs,X       DE      7 [16B]
//DEC dp,X        D6      6 [16B,Z]
    return true;
};
opcodes.prototype.DEX = function() {
//DEX             CA      2               n------c        Decrement X register.
    return true;
};
opcodes.prototype.DEY = function() {
//DEY             88      2               n------c        Decrement Y register.
    return true;
};
opcodes.prototype.EOR = function() {
//EOR #imm        49      2 [16A]         n------c        Exclusive-OR A with
//                                                        memory.
//EOR abs         4D      4 [16A]
//EOR abslong     4F      5 [16A]
//EOR dp          45      3 [16A,Z]
//EOR (dp)        52      6 [16A,Z]
//EOR [dp]        47      6 [16A,Z]
//EOR abs,X       5D      4 [16A,C]
//EOR abslong,X   5F      5 [16A]
//EOR abs,Y       59      4 [16A,C]
//EOR dp,X        55      4 [16A,Z]
//EOR (dp,X)      41      5 [16A,Z]
//EOR (dp),Y      51      6 [16A,Z,C]
//EOR [dp],Y      57      4 [16A,Z]
//EOR ofs,S       43      4 [16A]
//EOR (ofs,S),Y   53      7 [16A]

// XOR = ^
    return true;
};
opcodes.prototype.INC = function() {
//INC             1A      2               n------c        Increment A or memory.
//INC abs         EE      6 [16B]
//INC dp          E6      5 [16B,Z]
//INC abs,X       FE      7 [16B]
//INC dp,X        F6      6 [16B,Z]
    return true;
};
opcodes.prototype.INX = function() {
//INX             E8      2               n------c        Increment X register.
    return true;
};
opcodes.prototype.INY = function() {
//INY             C8      2               n------c        Increment Y register.
    return true;
};
opcodes.prototype.JML = function() {
//JML abslong     5C      4               --------        Jump long.
//JML [dp]        DC      6
    return true;
};
opcodes.prototype.JMP = function() {
//JMP abs         4C      3               --------        Jump.
//JMP (abs)       6C      5
//JMP (abs,X)     7C      6
    return true;
};
opcodes.prototype.JSL = function() {
//JSL abslong     22      8               --------        Jump to subroutine
//                                                        long.
    return true;
};
opcodes.prototype.JSR = function() {
//JSR abs         20      6               --------        Jump to subroutine.
//JSR (addr,X)    FC      8
    return true;
};
opcodes.prototype.LDA = function() {
//LDA #imm        A9      2 [16A]         n-----z-        Load accumulator with
//                                                        memory.
//LDA abs         AD      4 [16A]
//LDA abslong     AF      5 [16A]
//LDA dp          A5      3 [16A,Z]
//LDA (dp)        B2      5 [16A,Z]
//LDA [dp]        A7      6 [16A,Z]
//LDA abs,X       BD      4 [16A,C]
//LDA abslong,X   BF      5 [16A]
//LDA abs,Y       B9      4 [16A,C]
//LDA dp,X        B5      4 [16A,Z]
//LDA (dp,X)      A1      6 [16A,Z]
//LDA (dp),Y      B1      5 [16A,Z,C]
//LDA [dp],Y      B7      6 [16A,Z]
//LDA ofs,S       A3      4 [16A]
//LDA (ofs,S),Y   B3      7 [16A]
    return true;
};
opcodes.prototype.LDX = function() {
//LDX #imm        A2      2 [I]           n-----z-        Load X register with
//                                                        memory.
//LDX abs         AE      4 [I]
//LDX dp          A6      3 [I,Z]
//LDX abs,Y       BE      4 [I,C]
//LDX dp,Y        B6      4 [I,Z]
    return true;
};
opcodes.prototype.LDY = function() {
//LDY #imm        A0      2 [I]           n-----z-        Load Y register with
//                                                        memory.
//LDY abs         AC      4 [I]
//LDY dp          A4      3 [I]
//LDY abs,X       BC      4 [I,C]
//LDY dp,X        B4      4 [I,Z]
    return true;
};
opcodes.prototype.LSR = function() {
//LSR             4A      2               n-----zc        Logical shift A or
//                                                        memory right.
//LSR abs         4E      6 [16A]
//LSR dp          46      5 [16A,Z]
//LSR abs,X       5E      7 [16A]
//LSR dp,X        56      6 [16A,Z]
    return true;
};
opcodes.prototype.MVN = function() {
//MVN byte,byte   54      [M]             --------        Move memory negative
//                                                        (srcbank, destbank).
    return true;
};
opcodes.prototype.MVP = function() {
//MVP byte,byte   44      [M]             --------        Move memory positive
//                                                        (srcbank, destbank).
//                                                        * X = source address
//                                                          Y = target address
//                                                          A = length -1
    return true;
};
opcodes.prototype.NOP = function() {
//NOP             EA      2               --------        No operation.
    return true;
};
opcodes.prototype.ORA = function() {
//ORA #imm        09      2 [16A]         n-----z-        Or A with memory.
//ORA abs         0D      4 [16A]
//ORA abslong     0F      5 [16A]
//ORA dp          05      3 [16A,Z]
//ORA (dp)        12      5 [16A,Z]
//ORA [dp]        07      6 [16A,Z]
//ORA abs,X       1D      4 [16A,C]
//ORA abslong,X   1F      5 [16A]
//ORA abs,Y       19      4 [16A,C]
//ORA dp,X        15      4 [16A,Z]
//ORA (dp,X)      01      6 [16A,Z]
//ORA (dp),Y      11      5 [16A,Z,C]
//ORA [dp],Y      17      6 [16A,Z]
//ORA ofs,S       03      4 [16A]
//ORA (ofs,S),Y   13      7 [16A]

// OR = |
    return true;
};
opcodes.prototype.PEA = function() {
//PEA abs         F4      5               --------        Push effective absolute
//                                                        address.
    return true;
};
opcodes.prototype.PEI = function() {
//PEI (dp)        D4      6 [Z]           --------        Push effective indirect
//                                                        address.
    return true;
};
opcodes.prototype.PER = function() {
//PER relword     62      6               --------        Push effective relative
//                                                        address.
    return true;
};
opcodes.prototype.PHA = function() {
//PHA             48      3 [16A]         --------        Push accumulator.
    return true;
};
opcodes.prototype.PHB = function() {
//PHB             8B      3               --------        Push data bank
//                                                        register.
    return true;
};
opcodes.prototype.PHD = function() {
//PHD             0B      4               --------        Push direct page
//                                                        register.
    return true;
};
opcodes.prototype.PHK = function() {
//PHK             4B      3               --------        Push program bank
//                                                        register.
    return true;
};
opcodes.prototype.PHP = function() {
//PHP             08      3               --------        Push processor status
//                                                        register.
    return true;
};
opcodes.prototype.PHX = function() {
//PHX             DA      3 [I]           --------        Push X register.
    return true;
};
opcodes.prototype.PHY = function() {
//PHY             5A      3 [I]           --------        Push Y register.
    return true;
};
opcodes.prototype.PLA = function() {
//PLA             68      4 [16A]         n-----z-        Pull accumulator.
    return true;
};
opcodes.prototype.PLB = function() {
//PLB             AB      4               n-----z-        Pull data bank
//                                                        register.
    return true;
};
opcodes.prototype.PLD = function() {
//PLD             2B      5               n-----z-        Pull direct page
//                                                        register.
    return true;
};
opcodes.prototype.PLP = function() {
//PLP             28      4               nvmxdizc        Pull processor status
//                                                        register.
    return true;
};
opcodes.prototype.PLX = function() {
//PLX             FA      4 [I]           n-----z-        Pull X register.
    return true;
};
opcodes.prototype.PLY = function() {
//PLY             7A      4 [I]           n-----z-        Pull Y register.
    return true;
};
opcodes.prototype.REP = function() {
//REP #imm        C2      3               ????????        Reset processor status
//                                                        register bits.
    return true;
};
opcodes.prototype.ROL = function() {
//ROL             2A      2               n-----zc        Rotate A or memory
//                                                        left.
//ROL abs         2E      6 [16A]
//ROL dp          26      5 [16A,Z]
//ROL abs,X       3E      7 [16A]
//ROL dp,X        36      6 [16A,Z]
    return true;
};
opcodes.prototype.ROR = function() {
//ROR             2A      2               n-----zc        Rotate A or memory
//                                                        right.
//ROR abs         2E      6 [16A]
//ROR dp          26      5 [16A,Z]
//ROR abs,X       3E      7 [16A]
//ROR dp,X        36      6 [16A,Z]
    return true;
};
opcodes.prototype.RTI = function() {
//RTI             40      6 [N]           ????????        Return from interrupt.
//RTI             40      6               ??11????        (emulation mode).
    return true;
};
opcodes.prototype.RTL = function() {
//RTL             6B      6               --------        Return from subroutine
//                                                        long.
    return true;

};
opcodes.prototype.RTS = function() {
//RTS             60      6               --------        Return from subroutine.
    return true;
};
opcodes.prototype.SBC = function() {
//SBC #imm        E9      2 [16A,D]       nv----zc        Subtract memory from
//                                                        A with borrow.
//SBC abs         ED      4 [16A,D]
//SBC abslong     EF      5 [16A,D]
//SBC dp          E5      3 [16A,Z,D]
//SBC (dp)        F2      5 [16A,Z,D]
//SBC [dp]        E7      6 [16A,Z,D]
//SBC abs,X       FD      4 [16A,C,D]
//SBC abslong,X   FF      5 [16A,D]
//SBC abs,Y       F9      4 [16A,C,D]
//SBC dp,X        F5      4 [16A,Z,D]
//SBC (dp,X)      E1      6 [16A,Z,D]
//SBC (dp),Y      F1      5 [16A,Z,C,D]
//SBC [dp],Y      F7      6 [16A,Z,D]
//SBC ofs,S       E3      4 [16A,D]
//SBC (ofs,S),Y   F3      7 [16A,D]
    return true;
};
opcodes.prototype.SEC = function() {
//SEC             38      2               -------1        Set carry bit.
    return true;
};
opcodes.prototype.SED = function() {
//SED             F8      2               ----1---        Set decimal bit.
    return true;
};
opcodes.prototype.SEI = function() {
//SEI             78      2               -----1--        Set interrupt disable
//                                                        bit.
    return true;
};
opcodes.prototype.SEP = function() {
//SEP #imm        E2      3               ????????        Set processor status
//                                                        register bits.
    return true;
};
opcodes.prototype.STA = function() {
//STA abs         8D      4 [16A]         --------        Store A to memory.
//STA abslong     8F      5 [16A]
//STA dp          85      3 [16A,Z]
//STA (dp)        92      5 [16A,Z]
//STA [dp]        87      6 [16A,Z]
//STA abs,X       9D      5 [16A]
//STA abslong,X   9F      5 [16A]
//STA abs,Y       99      5 [16A]
//STA dp,X        95      4 [16A,Z]
//STA (dp,X)      81      6 [16A,Z]
//STA (dp),y      91      6 [16A,Z]
//STA [dp],y      97      6 [16A,Z]
//STA ofs,S       83      4 [16A]
//STA (ofs,S),Y   93      7 [16A]
    return true;
};
opcodes.prototype.STC = function() {
//STP             DB      3               --------        Stop the processor.
    return true;
};
opcodes.prototype.STX = function() {
//STX abs         8E      4 [I]           --------        Store X register to
//                                                        memory.
//STX dp          86      3 [I,Z]
//STX dp,Y        96      4 [I,Z]
    return true;
};
opcodes.prototype.STY = function() {
//STY abs         8C      4 [I]           --------        Store Y register to
//                                                        memory.
//STY dp          84      3 [I,Z]
//STY dp,X        94      4 [I,Z]
    return true;
};
opcodes.prototype.STZ = function() {
//STZ abs         9C      4 [16A]         --------        Store zero to memory.
//STZ dp          64      3 [16A,Z]
//STZ abs,X       9E      5 [16A]
//STZ dp,X        74      4 [16A,Z]
    return true;
};
opcodes.prototype.TAX = function() {
//TAX             AA      2               n-----z-        Transfer A to X
//                                                        register.
    return true;
};
opcodes.prototype.TAY = function() {
//TAY             A8      2               n-----z-        Transfer A to Y
//                                                        register.
    return true;
};
opcodes.prototype.TCD = function() {
//TCD             5B      2               n-----z-        Transfer 16-bit A to
//                                                        direct page register.
    return true;
};
opcodes.prototype.TCS = function() {
//TCS             1B      2               --------        Transfer A to stack
//                                                        pointer.
    return true;
};
opcodes.prototype.TDC = function() {
//TDC             7B      2               n-----z-        Transfer direct page
//                                                        register to A.
    return true;
};
opcodes.prototype.TRB = function() {
//TRB addr        1C      6 [16B]         ------z-        Test and reset bits
//                                                        against A.
//TRB dp          14      5 [16B,Z]
    return true;
};
opcodes.prototype.TSB = function() {
//TSB addr        0C      6 [16B]         ------z-        Test and set bits
//                                                        against A.
//TSB dp          04      5 [16B,Z]
    return true;
};
opcodes.prototype.TSC = function() {
//TSC             3B      2               n-----z-        Transfer stack pointer
//                                                        to A.
    return true;
};
opcodes.prototype.TSX = function() {
//TSX             BA      2               n-----z-        Transfer stack pointer
//                                                        to X register.
    return true;
};
opcodes.prototype.TXA = function() {
//TXA             8A      2               n-----z-        Transfer X register to
//                                                        A.
    return true;
};
opcodes.prototype.TXS = function() {
//TXS             9A      2               --------        Transfer X register to
//                                                        stack pointer.
    return true;
};
opcodes.prototype.TXY = function() {
//TXY             9B      2               n-----z-        Transfer X register to
//                                                        Y register.
    return true;
};
opcodes.prototype.TYA = function() {
//TYA             98      2               n-----z-        Transfer Y register to
//                                                        A.
    return true;
};
opcodes.prototype.TYX = function() {
//TYX             BB      2               n-----z-        Transfer Y register to
//                                                        X register.
    return true;
};
opcodes.prototype.WAI = function() {
//WAI             CB      3               --------        Wait for interrupt.
    return true;
};

opcodes.prototype.WDM = function() {
//WDM             42      ?               --------        Reserved (currently
//                                                        NOP).
    return true;
};

opcodes.prototype.XBA = function() {
//XBA             EB      3               n-----z-        Exchange the B and A
//                                                        accumulators.
    return true;
};
opcodes.prototype.XCE = function() {
//XCE             FB      2               --??----        Exchange carry and
//                                                        emulation bits.
    return true;
};



/*
 * The 65818 cpu object
 * @returns {Boolean}
 */
function jsW65C816S() {
    this.opcode = new opcodes();
    this.registers = {};
    this.signals = {};
    this.flags = {};
    return true;
}

jsW65C816S.prototype.Reset = function() {

    // Set registers
    this.registers.D = [0, 0];
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
    
    return true;
};

