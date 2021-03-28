import { Block, Blockchain } from "./blockchain";
import { Transaction } from "./wallet";

let vCoin = new Blockchain();
const addresses = ["add1", "add2", "add3", "newAdd"]

// Create transactions
vCoin.createTransaction(new Transaction(addresses[0], addresses[1], 10));
vCoin.createTransaction(new Transaction(addresses[1], addresses[2], 4));

// Mine
console.log("Starting mining.");
vCoin.minePendingTransactions(addresses[3]);

// Display account balances
for (let i = 0; i < addresses.length; i++) {
  console.log(`Balance of ${addresses[i]}: ${vCoin.getAddressBalance(addresses[i])}`);

  /*
    Prints:

    Balance of add1: -10
    Balance of add2: 6
    Balance of add3: 4
    Balance of newAdd: 0
  */
}



// Create transactions
vCoin.createTransaction(new Transaction(addresses[2], addresses[0], 2));

// Mine
console.log("Starting mining.");
vCoin.minePendingTransactions("newAdd");

// Display account balances
for (let i = 0; i < addresses.length; i++) {
  console.log(`Balance of ${addresses[i]}: ${vCoin.getAddressBalance(addresses[i])}`);

  /*
    Prints:
    
    Balance of add1: -8
    Balance of add2: 6
    Balance of add3: 2
    Balance of newAdd: 1
  */
}
