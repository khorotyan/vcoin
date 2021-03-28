import Block from "./block";

export default class Blockchain {
  blocks: Block[];
  difficulty: number;

  constructor() {
    this.blocks = [this.createGenesisBlock()];
    this.difficulty = 3;
  }

  createGenesisBlock(): Block {
    return new Block(0, new Date(), "Genesis block", "0");
  }

  getLastBlock(): Block {
    return this.blocks[this.blocks.length - 1];
  }

  addBlock(newBlock: Block): void {
    newBlock.previousHash = this.getLastBlock().hash;
    newBlock.mineNewBlock(this.difficulty);

    this.blocks.push(newBlock);
  }

  chainValid(): boolean {
    for (let i = 1; i < this.blocks.length; i++) {
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];

      // Check if current block hash is calculated correctly
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      return true;
    }
  }
}