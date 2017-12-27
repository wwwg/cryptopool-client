const net = require('net'),
    EventEmitter = require('events');
class PoolClient extends EventEmitter {
    constructor(url, port) {
        super();
        this._url = url;
        this._port = port;
        if (!url || !port) {
            throw new Error('PoolClient requires url and port to construct.');
            return;
        }
        this.minerId = null;
        let socket = new net.Socket(port, url),
            me = this;
        this._socket = socket;
    }
}