// there are four type of stream read, write

//readable -> use for read
//writable -> write to a file
//duplex -> can be used for both read and write (TCP socket)
//transform -> zlib steams

const fs = require("fs");
const zlib = require("zlib");
const crypto = require("crypto");
const { Transform } = require("stream");

class EncryptStream extends Transform {
  constructor(key, vector) {
    super();
    this.key = key;
    this.vector = vector;
  }

  _transform(chunk, encoding, callback) {
    try {
      const cipher = crypto.createCipheriv("aes-256-ctr", this.key, this.vector); // using CTR mode
      const encrypted = Buffer.concat([cipher.update(chunk), cipher.final()]);
      this.push(encrypted); // fixed push typo
      callback();
    } catch (err) {
      callback(err);
    }
  }
}

const key = crypto.randomBytes(32);   // 256-bit key
const vector = crypto.randomBytes(16); // 128-bit IV

const readable = fs.createReadStream("input.txt");

// new gzip object to compress the stream of data
const gzipStream = zlib.createGzip();

const encryptedStream = new EncryptStream(key, vector);

const writableStream = fs.createWriteStream("output.txt.gz.enc");

// read -> compress -> encrypt -> write
readable.pipe(gzipStream).pipe(encryptedStream).pipe(writableStream);

console.log("Streaming -> compressing -> encrypting -> writing data");
