const SHA256 = require("crypto-js/sha256");
const hex2ascii = require("hex2ascii");

class Block {
  constructor(data) {
    this.hash = null;
    this.height = 0;
    this.body = Buffer.from(JSON.stringify(data).toString("hex"));
    this.time = 0;
    this.previousBlockHash = null;
  }

  validate() {
    return new Promise((res, reject) => {
      let currentHash = this.hash;

      this.hash = SHA256(JSON.stringify({ ...this, hash: null })).toString();

      if (currentHash !== this.hash) {
        return res(false);
      }

      res(true);
    });
  }

  getBlockData() {
    return new Promise((res, reject) => {
      let encodedData = this.body;
      let decodedData = hex2ascii(encodedData);
      let dataObject = JSON.parse(decodedData);

      if (dataObject === "Genesis Block") {
        reject(new Error("This is the Genesis Block"));
      }

      res(dataObject);
    });
  }

  toString() {
    const { hash, height, body, time, previousBlockHash } = this;
    return `Block -
        hash: ${hash}
        height: ${height}
        body: ${body}
        time: ${time}
        previousBlockHash: ${previousBlockHash}
        -------------------------------------`;
  }
}

module.exports = Block;