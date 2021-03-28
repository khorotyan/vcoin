import { Block, Blockchain } from "./blockchain";

let vCoin = new Blockchain();

console.log(JSON.stringify(vCoin, null, 2));
vCoin.addBlock(new Block(1, new Date(), { amount: 4 }));

console.log(JSON.stringify(vCoin, null, 2));
vCoin.addBlock(new Block(2, new Date(), { amount: 12 }));

console.log(JSON.stringify(vCoin, null, 2));

