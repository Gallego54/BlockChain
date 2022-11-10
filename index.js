const Blockchain = require("./src/blockchain");
const Block = require("./src/block");

(async function () {
  const blockchain = await new Blockchain();

  const firstBlock = new Block({ data: "Block #1" });
  await blockchain.addBlock(firstBlock);

  const secondBlock = new Block({ data: "Block #2" });
  await blockchain.addBlock(secondBlock);

  blockchain.print();
})();


