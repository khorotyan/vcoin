import { SHA256 } from "crypto-js";
import * as elliptic from "elliptic";

const ec = new elliptic.ec("secp256k1");

export default class Transaction {
  fromAddress: string;
  toAddress: string;
  amount: number;
  signature: string;

  constructor(fromAddress: string, toAddress: string, amount: number) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }

  // Return Sha256 hash of the transaction
  calculateHash() {
    return SHA256(this.fromAddress + this.fromAddress + this.fromAddress).toString();
  }

  signTransaction(signingKey: elliptic.ec.KeyPair) {
    if (signingKey.getPublic("hex") !== this.fromAddress) {
      throw new Error("Cannot sign other wallet transactions.");
    }

    const transactionHash = this.calculateHash();
    this.signature = signingKey.sign(transactionHash, "base64").toDER("hex");
  }

  isValid() {
    // If the transaction is from the mining reward
    if (this.fromAddress === null) {
      return true;
    }

    if (!this.signature || this.signature.length === 0) {
      throw new Error("Empty transaction signature.");
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, "hex");

    return publicKey.verify(this.calculateHash(), this.signature);
  }
}