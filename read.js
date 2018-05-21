const stream = require('stream');
const EventEmitter = require('events').EventEmitter;
const StringDecoder = require('string_decoder').StringDecoder;
const path = require('path');
const fs = require('fs');

class ReadLineByline extends EventEmitter{

    constructor(path, option){
        super();
        this.encoding = option && option.encoding || 'utf8';
        this.lines = [];
        this.fragment = '';
        this.isEnd = false;
        this.decoder = new StringDecoder(this.encoding);
        this.init(path);
    }

    init(path){
        const readStream = path instanceof stream.Readable ? path 
                                                           : fs.createReadStream(path, {encoding: this.encoding});
        readStream.on('error', (err) => this.emit('error', err));
        readStream.on('data', (data) => {
            readStream.pause();
            data = Buffer.isBuffer(data) ? this.decoder.write(data) : data;
            this.lines = this.lines.concat(data.split(/(?:\r?\n|\r)/g));
            this.lines[0] = this.fragment + this.lines[0];
            this.fragment = this.lines.pop() || '';
            this.next();
        });
        readStream.on('end', () => {
            this.isEnd = true;
        });
        this.readStream = readStream;
    }

    nextLine(){
        if(!this.lines.length){
            if(this.isEnd){
                let line = this.fragment.trim();
                line ? this.emit('line', line) : this.emit('end');
            }else{
                this.readStream.resume();
            }
        }else{
            let line = this.lines.shift().trim();
            line ? this.emit('line', line) : this.next();
        }
    }

    next(){
        setImmediate(() => this.nextLine());
    }
}

module.exports = ReadLineByline;


















