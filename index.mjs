import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
import { ask, yesno } from '@reach-sh/stdlib/ask.mjs';
const stdlib = loadStdlib(process.env);

const startingBalance = stdlib.parseCurrency(100);

// const [ accAlice, accBob, accBob2, accBob3, accBob4, accBob5, accBob6 ] =
//   await stdlib.newTestAccounts(7, startingBalance);
const acc = await stdlib.newTestAccount(startingBalance);
console.log('Hello, Alice and Bob!');

console.log('Launching...');
// const ctcAlice = accAlice.contract(backend);
// const ctcBob = accBob.contract(backend, ctcAlice.getInfo());

console.log('Starting backends...');

// const users = [];

// const startBobs = async () => {
// // const newBob = async(who) => {
// //   const acc = await stdlib.newTestAccount(startingBalance);
// //   const ctc = acc.contract(backend, ctcAlice.getInfo());
// //   users.push(acc.getAddress());
// //   return ctc
// // };

// // await newBob('Bob1')
// // await newBob('Bob2')
// // await newBob('Bob3')

// const ctcA = accBob.contract(backend, ctcAlice.getInfo());
// const ctcB = accBob2.contract(backend, ctcAlice.getInfo());
// const ctcD = accBob3.contract(backend, ctcAlice.getInfo());
// const ctcE = accBob3.contract(backend, ctcAlice.getInfo());
// const ctcF = accBob3.contract(backend, ctcAlice.getInfo());
// const ctcG = accBob3.contract(backend, ctcAlice.getInfo());

// await ctcA.a.Bob.getAddress();
// await ctcB.a.Bob.getAddress();
// await ctcD.a.Bob.getAddress();
// await ctcE.a.Bob.getAddress();
// await ctcF.a.Bob.getAddress();
// await ctcG.a.Bob.getAddress();





// console.log(users)  
// }



const Creator = {
// await ctcAlice.p.Alice({
  ready: async() => {
    console.log(`Alice is ready to accept Attachers...`);
    // startBobs();
  },
  log: (c, a) => {
    if(a <= 5){
      console.log(`Attacher: ${c}, ${stdlib.bigNumberToNumber(a)}`)
    }
    else{
      console.log(`max number reached`)
      process.exit(0)
    }
  } 
// });

}

const Attacher = {
  getAddress: async() => {
    console.log(`this is the address`)
  }
}

const program = async () => {

  const isDeployer = await ask(
    `Do you want to deploy the contract?`,
    yesno
  )
  const who = isDeployer ? 'Deployer' : 'Attecher';

  console.log(`Starting as ${who}`);

  //Contract gets initialized here
  let ctc = null;
  if(isDeployer){
    ctc = acc.contract(backend);
    backend.Alice(ctc, {...Creator});
    // console.log(`Alice is ready to accept Attachers...`);

    const info = JSON.stringify(await ctc.getInfo(), null, 1)
    console.log(info); //display info
  }
  else {
    const info = await ask(
      `Please paste the contract information of the contract you want to subscribe to:`,
      JSON.parse
    );
    ctc = acc.contract(backend, info);
    // backend.getAddress(ctc, Attacher);
    await ctc.a.Bob.getAddress();
    console.log(`Successfully connected`);
    const viewC = await ctc.v.count();
    const viewA = await ctc.v.addr();
    const wisdomF = viewC[0] === 'None' ? 0 : viewC[1];
    console.log(`this is the view count :${wisdomF.toString()} with address : ${viewA.toString()}`);
    const err = await ctc.v.err();
    console.log(`${err.toString()}`);

  }


}

await program();

// console.log('Goodbye, Alice and Bob!');
