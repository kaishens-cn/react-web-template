const path = require('path');
const fs = require('fs');
const { sassPlugin } = require('esbuild-sass-plugin');
const postcss = require('postcss');
const clearPlugin = require('./plugins/clearOutDir');
const compileTime = require('./plugins/compileTime');
const html = require('./plugins/html');
const swc = require('./plugins/swc');

const rootPath = path.join(__dirname, '../../');

module.exports = {
  config: {
    entryPoints: [path.resolve(rootPath, './src/app.tsx')],
    outdir: path.join(rootPath, './dist'),
    entryNames: '[dir]/[name]-[hash]',
    bundle: true,
    minify: true,
    metafile: true,
    plugins: [
      sassPlugin({
        async transform(source) {
          const { css } = await postcss([require('autoprefixer')]).process(source, { from: undefined });
          return css;
        }
      }),
      compileTime(),
      html(rootPath, path.resolve(rootPath, './public/index.html'))
    ]
  },
  rootPath
};
