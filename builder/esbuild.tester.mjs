/** Name:   BangJs.builder.esbuild.tester.mjs
 *  Desc:   Build the testing environment from ./dist
 *  Author: Jimy Houlbrook
 *  Date:   28/04/24
 */


import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['./dist/main.js'],
  bundle: true,
  outfile: './test/main.js'
});