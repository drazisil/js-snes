/* 
 * This is the main code of the application.
 * isSystemReady is a function to wait for the ROM to be loaded
 * and then call the run() loop of the system
 */

/**
 * 
 * @param {jsSNESSystem} cpu
 * @param {integer} cycleCount
 * @returns {null}
 */
function isSystemReady(cpu, cycleCount) {
    "use strict";
    if (cpu.cart.state === true) {
        clearTimeout(1); // default under Chrome
        clearTimeout(2); // Default under Firefox
        cpu.run(cycleCount);
    }
    return null;
}

var DEBUGMODE = true;
var MAXCYCLES = 5;
var snes = new this.window.jsSNESSystem();
snes.powerOn();
snes.cart.insert('http://jwebnet.net/jsSNES/Super%20Mario%20World.smc');

/*
 * Set timeout untul system is ready for use
 */
var timeoutID = this.window.setInterval(isSystemReady, 500, snes, MAXCYCLES);

