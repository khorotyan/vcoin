import { Block, Blockchain } from "./blockchain";
import { Transaction } from "./wallet";
import * as elliptic from "elliptic";

const ec = new elliptic.ec("secp256k1");

const myKeyPair = ec.genKeyPair();
const otherKeyPair = ec.genKeyPair();



const privateKey1 = myKeyPair.getPrivate("hex");
const privateKey2 = otherKeyPair.getPrivate("hex");

const myKey = ec.keyFromPrivate(privateKey1);
const otherKey = ec.keyFromPrivate(privateKey2);

const myWalletAddress = myKey.getPublic("hex");
const otherAddress = otherKey.getPublic("hex");



const vCoin = new Blockchain();

const transaction = new Transaction(myWalletAddress, otherAddress, 3);
transaction.signTransaction(myKey);
vCoin.addTransaction(transaction);

console.log("Starting mining.");
vCoin.minePendingTransactions(myWalletAddress);

console.log(`My balance: ${vCoin.getAddressBalance(myWalletAddress)}`); // My balance: -2
console.log(`Other user balance: ${vCoin.getAddressBalance(otherAddress)}`); // Other user balance: 3