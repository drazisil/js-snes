/*
 * This is the jsAjHD object
 * @returns {jsAjHD}
 */
function jsAjHD() {
    /*
     * is the drive fully loaded?
     * @type Boolean
     */
    var cached;
    /*
     * holds the binary data
     * @type Uint8Array
     */
    var buffer;
    /*
     * read head position
     * @type Number
     */
    this.cached = false;
    return true;
}

/*
 * load the hard drive from path
 * @param {string} path
 * @returns {undefined}
 */
jsAjHD.prototype.preCache = function(path) {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", path, true);
    oReq.responseType = "arraybuffer";
    me = this;
    oReq.onload = function(oEvent) {
        var arrayBuffer = oReq.response; // Note: not oReq.responseText
        if (arrayBuffer) {
            me.buffer = new Uint8Array(arrayBuffer);
            me.cached = true;
        }
    };

    oReq.send(null);
}

/*
 * check if hard drive is loaded
 * @returns {Boolean}
 */
jsAjHD.prototype.isLoaded = function() {
    return this.cached;
}

/*
 * read the next byte from the buffer
 * advance the position
 * @returns {data@arr;buffer|data}
 */
jsAjHD.prototype.read = function(position) {
    if (isNaN(position)) {
        debug('Invalid head position')
        return;
    } else {
        data = this.buffer[position];
    }

    return data;
}

jsAjHD.prototype.readHex = function(position) {
    if (isNaN(position)) {
        debug('Invalid head position')
        return;
    } else {
        data = pad(this.buffer[position].toString(16)).toUpperCase();
    }

    return data;
}

jsAjHD.prototype.write = function(position, value) {
    if (isNaN(position)) {
        debug('Invalid head position')
        return false;
    } else {
        this.buffer[position] = data;
        return true;
    }
}


/*
 * set the read head position to a certain value
 * @param {number} position
 * @returns {undefined}
 */
jsAjHD.prototype.seek = function(position) {
    this.position = position;
}