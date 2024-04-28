import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['./dist/main.js'],
  bundle: true,
  //outdir: path.join(path.resolve(), './dist'),
  outfile: './test/main.js'
});