const net = require('net'),
    EventEmitter = require('events');
class PoolClient extends EventEmitter {
    _send(method, params) {
        params.id = this.minerId;
        this.msgId++;
        let mid = this.msgId,
            msg = JSON.stringify({
                method: method,
                params: params,
                id: mid
            }) + '\n';
        this._socket.write(msg, 'utf8');
    }
    _handleConnect() {
        this.emit('connected');
        this.emit('connect');
    }
    _handleDisconnect() {
        this.emit('disconnected');
        this.emit('disconnect');
    }
    constructor(url, port) {
        super();
        this._url = url;
        this._port = port;
        if (!url || !port) {
            throw new Error('PoolClient requires url and port to construct.');
            return;
        }
        this.minerId = null;
        this.msgId = 0;
        let socket = new net.Socket(port, url),
            me = this;
        this._socket = socket;
        socket.on('connect', () => {
            me._handleConnect.call(me);
        }).on('close', () => {
            me._handleDisconnect.call(me);
        });
    }
}