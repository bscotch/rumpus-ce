import type { RumpusCE as RumpusCEImport } from '../src/index.js';
declare global {
  const RumpusCE: typeof RumpusCEImport;
  interface Window {
    RumpusCE: typeof RumpusCE;
  }
}
