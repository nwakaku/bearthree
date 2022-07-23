'reach 0.1';

export const main = Reach.App(() => {
  const A = Participant('Alice', {
    // Specify Alice's interact interface here
    ready: Fun([], Null),
    log: Fun(true, Null)
  });

  const B = API('Bob', {
    getAddress: Fun([], Null),
    // log: Fun(true, Null)
    // Specify Bob's interact interface here
  });

  const V = View({
    addr: Address,
    count: UInt,
    err: Bytes(16),
  });

  init();
  // The first one to publish deploys the contract
  A.only(() => {
    interact.ready()
  })
  A.publish();
  // commit();

  // const ADDRESS = new Set()
 
  const [keepGoing, count] =
  parallelReduce([ true, 0 ])
    .define( () => {V.count.set(count); V.addr.set(this)})
    .invariant(balance() == 0)
    .while(keepGoing && count <= 5)
    .api_(B.getAddress, () => {
      // check(! ADDRESS.member(this), "Address added");
      return [(k) => {
        k(null);
        // ADDRESS.insert(this);
          A.interact.log('counter', count + 1)
          
        
        return [keepGoing, count + 1]

      }]
    }) 
    // assert(count <= 2)
    commit()   
    //  .timeout(false);

  A.interact.log('max of 5 attachers has been reached', count)
  // V.err.set('max of 5 reached')

  // write your program here
  // commit();
  // A.publish()
  // V.err.set('this has errored')
  // commit()
  exit();
});
