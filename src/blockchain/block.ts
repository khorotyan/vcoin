import * as cryptoJs from "crypto-js";

const { SHA256 } = cryptoJs;

export default class Block {
  index: number;
  timestamp: Date;
  data: any;
  hash: string;
  previousHash: string;

  constructor(index: number, timestamp: Date, data: any, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}