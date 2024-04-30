/** Name:   BangJs.builder.esbuild.engine.mjs
 *  Desc:   Build the engine from ./src
 *  Author: Jimy Houlbrook
 *  Date:   28/04/24
 */

import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['./src/main.ts'],
  bundle: true,
  platform: 'node',
  format: "cjs",
  outfile: './dist/bang.js'
});