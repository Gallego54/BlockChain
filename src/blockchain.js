const SHA256 = require("crypto-js/sha256");
const Block = require("./block");

class Blockchain {
  constructor() {
    this.chain = [];
    this.height = -1;
    this.initializeChain();
  }

  async initializeChain() {
    if (this.height === -1) {
      const block = new Block({ data: "Genesis Block" });
      await this.addBlock(block);
    }
  }

  addBlock(block) {
    return new Promise(async (res, rej) => {
      block.height = this.chain.length;
      block.time = new Date().getTime().toString();

      if (this.chain.length > 0) {
        block.previousBlockHash = this.chain[this.chain.length - 1].hash;
      }

      let errors = await this.validateChain();
      if (errors.length > 0) {
        rej(new Error("The chain is not valid: ", errors));
      }

      block.hash = SHA256(JSON.stringify(block)).toString();
      this.chain.push(block);
      res(block);
    });
  }

  validateChain() {
    const errors = [];

    return new Promise(async (res, rej) => {
      this.chain.map(async (block) => {
        try {
          let isValid = await block.validate();
          if (!isValid) {
            errors.push(new Error(`The block ${block.height} is not valid`));
          }
        } catch (err) {
          errors.push(err);
        }
      });

      res(errors);
    });
  }

  print() {
    for (let block of this.chain) {
      console.log(block.toString());
    }
  }
}

module.exports = Blockchain;