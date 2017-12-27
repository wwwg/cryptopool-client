const net = require('net'),
    EventEmitter = require('events');
class PoolClient extends EventEmitter {
    constructor(url, port) {
        super();
        this._url = url;
        this._port = port;
    }
}