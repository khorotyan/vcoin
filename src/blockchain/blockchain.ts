import Block from "./block";
import { Transaction } from "../wallet";

export default class Blockchain {
  blocks: Block[];
  pendingTransactions: Transaction[];
  difficulty: number;
  miningReward: number;

  constructor() {
    this.blocks = [this.createGenesisBlock()];
    this.pendingTransactions = [];
    this.difficulty = 4;
    this.miningReward = 1;
  }

  private createGenesisBlock(): Block {
    return new Block(new Date(), [], "0");
  }

  getLastBlock(): Block {
    return this.blocks[this.blocks.length - 1];
  }

  minePendingTransactions(rewardAddress: string): void {
    const rewardTransaction = new Transaction(null, rewardAddress, this.miningReward);
    this.pendingTransactions.push(rewardTransaction);

    const block = new Block(new Date(), this.pendingTransactions, this.getLastBlock().hash);

    if (!this.isChainValid()) {
      throw new Error("The chain is invalid.");
    }

    block.mineNewBlock(this.difficulty);
    this.blocks.push(block);

    this.pendingTransactions = [];
  }

  addTransaction(transaction: Transaction) {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error("From and To addresses are required.");
    }

    if (!transaction.isValid()) {
      throw new Error("Invalid transaction.");
    }

    if (transaction.amount <= 0) {
      throw new Error("Transaction amount must be greater than 0.");
    }

    if (this.getAddressBalance(transaction.fromAddress) < transaction.amount) {
      throw new Error("Insufficient balance.");
    }

    this.pendingTransactions.push(transaction);
  }

  getAddressBalance(address): number {
    let balance = 0;

    for (const block of this.blocks) {
      for (const transaction of block.transactions) {
        if (transaction.toAddress === address) {
          balance += transaction.amount;
        }

        if (transaction.fromAddress === address) {
          balance -= transaction.amount;
        }
      }
    }

    return balance;
  }

  isChainValid(): boolean {
    // Check genesis block validity
    const genesisCopy = this.createGenesisBlock();
    if (genesisCopy.transactions.length != this.blocks[0].transactions.length ||
      genesisCopy.previousHash != this.blocks[0].previousHash) {
        return false;
    }

    for (let i = 1; i < this.blocks.length; i++) {
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];

      // Check if current block transactions are valid
      if (!currentBlock.hasValidTransactions()) {
        return false;
      }

      // Check if current block hash is calculated correctly
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}