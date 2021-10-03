/**
 * @file
 * This is a Typescript shim to provide type support while writing
 * Rumpus code for import. It tells Typescript that `window.RumpusCE`
 * exists and is the Rumpus Client, so that you can get proper
 * intellisense support.
 *
 * It works ambiently for code editors using the Typescript language server.
 */

/**
 * @remarks
 * For your own use, you'd want to import from the module instead
 * of the source code.
 */
// import type { RumpusCE as RumpusCEImport } from '@bscotch/rumpus-ce';

import type { RumpusCE as RumpusCEImport } from '../src/index.js';
declare global {
  const RumpusCE: typeof RumpusCEImport;
  interface Window {
    RumpusCE: typeof RumpusCE;
  }
}
