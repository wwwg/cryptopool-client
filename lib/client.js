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
    _processMsg(msg) {
        if (msg.error) {
            this.emit('poolError', msg.error);
        }
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
        }).on('data', data => {
            let str = data.toString('utf8'),
                msgs = str.split('\n');
            msgs.pop(); // Last array entry will always be empty
            for (let i = 0; i < msgs.length; ++i) {
                let obj;
                try {
                    obj = JSON.parse(msgs[i]);
                } catch (e) {
                    me.emit('error', new Error('Failed to parse message'));
                    return;
                }
                me._processMsg(obj);
            }
        });
    }
}