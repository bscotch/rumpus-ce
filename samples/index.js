
/**
 * @typedef {import('../src/lib/RumpusCE').default} RumpusCE
*/

// @ts-ignore
// eslint-disable-next-line
const rce = /** @type {RumpusCE} */(new RumpusCE());

rce.version()
  .then(versionInfo=>{
    // Add the Rumpus version to the footer.
    console.log(versionInfo);
    document.getElementById('rumpus-version').innerHTML = `(v${versionInfo.rumpus})`;
  });
