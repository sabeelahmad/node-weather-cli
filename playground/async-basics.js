/* Playing around with asynchronous aspect of node */
console.log('Starting app.');

/* Node provided async function */
setTimeout(() => {
  /* This will be executed only after the mentioned time delay - 2000 ms */
  console.log('Inside of callback');
}, 2000);

/* A setTimeout with no delay */
setTimeout(() => {
  /* Executes after line 16 statement ? why explained in next vid */
  console.log('Second setTimeout');
}, 0);

console.log('Finishing app.');