import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
import { ask, yesno } from '@reach-sh/stdlib/ask.mjs';
const stdlib = loadStdlib(process.env);

const startingBalance = stdlib.parseCurrency(100);

const [ accAlice, accBob, accBob2, accBob3, accBob4, accBob5, accBob6 ] =
  await stdlib.newTestAccounts(7, startingBalance);
console.log('Hello, Alice and Bob!');

console.log('Launching...');
const ctcAlice = accAlice.contract(backend);
// const ctcBob = accBob.contract(backend, ctcAlice.getInfo());

console.log('Starting backends...');

const users = [];

const startBobs = async () => {
// const newBob = async(who) => {
//   const acc = await stdlib.newTestAccount(startingBalance);
//   const ctc = acc.contract(backend, ctcAlice.getInfo());
//   users.push(acc.getAddress());
//   return ctc
// };

// await newBob('Bob1')
// await newBob('Bob2')
// await newBob('Bob3')

const ctcA = accBob.contract(backend, ctcAlice.getInfo());
const ctcB = accBob2.contract(backend, ctcAlice.getInfo());
const ctcD = accBob3.contract(backend, ctcAlice.getInfo());
const ctcE = accBob3.contract(backend, ctcAlice.getInfo());
const ctcF = accBob3.contract(backend, ctcAlice.getInfo());
const ctcG = accBob3.contract(backend, ctcAlice.getInfo());

await ctcA.a.Bob.getAddress();
await ctcB.a.Bob.getAddress();
await ctcD.a.Bob.getAddress();
await ctcE.a.Bob.getAddress();
await ctcF.a.Bob.getAddress();
await ctcG.a.Bob.getAddress();





console.log(users)  
}





await ctcAlice.p.Alice({
  ready: () => {
    console.log(`Alice is ready`);
    startBobs();
  },
  log: (addr, a) => console.log(`Deployer sees this address was whitelisted: ${stdlib.formatAddress(addr)}, ${stdlib.bigNumberToNumber(a)}`)
});

console.log('Goodbye, Alice and Bob!');
