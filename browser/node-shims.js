/**
 * @file
 * Used by esbuild to replace stuff used by the Node version with
 * things that will either work or at least not break in the browser
 * version.
 */
export const process = {
  env: {},
};
