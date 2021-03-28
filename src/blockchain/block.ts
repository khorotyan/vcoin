import * as cryptoJs from "crypto-js";

const { SHA256 } = cryptoJs;

export default class Block {
  index: number;
  timestamp: Date;
  data: any;
  hash: string;
  previousHash: string;
  nonce: number;

  constructor(index: number, timestamp: Date, data: any, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash(): string {
    return SHA256(this.index + this.nonce + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }

  mineNewBlock(difficulty: number) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log(`Mined block hash: ${this.hash}`);
  }
}