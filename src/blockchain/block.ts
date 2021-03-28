import { Transaction } from "../wallet";
import { SHA256 } from "crypto-js";

export default class Block {
  timestamp: Date;
  transactions: Transaction[];
  hash: string;
  previousHash: string;
  nonce: number;

  constructor(timestamp: Date, transactions: Transaction[], previousHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash(): string {
    return SHA256(this.nonce + this.previousHash + this.timestamp + JSON.stringify(this.transactions)).toString();
  }

  mineNewBlock(difficulty: number) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log(`Mined block hash: ${this.hash}`);
  }
}