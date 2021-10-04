import RCE from './lib/RumpusCE.js';
export const RumpusCE = RCE;
export default RumpusCE;

try {
  // For the browser build, attach the RumpuseCE
  // client object to Window to make it globally
  // available and simplify use.
  if (window) {
    // @ts-ignore
    window.RumpusCE = RumpusCE;
  }
} catch {}

export * from './lib/RumpusCE.js';
export * from './types/aliases.js';
export * from './types/bookmarks.js';
export * from './types/levels.js';
export * from './types/players.js';
export * from './types/auth.js';
