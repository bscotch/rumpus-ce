import RCE from './lib/RumpusCE.js';
export const RumpusCE = RCE;
export default RumpusCE;

if (window) {
  // @ts-ignore
  window.RumpusCE = RumpusCE;
}

export * from './lib/RumpusCE.js';
export * from './types/aliases.js';
export * from './types/bookmarks.js';
export * from './types/levels.js';
export * from './types/players.js';
export * from './types/auth.js';
