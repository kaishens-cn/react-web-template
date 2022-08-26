const path = require('path');
const compileTime = require('./plugins/compileTime');
const html = require('./plugins/html');
const stylePlugin = require('esbuild-style-plugin');

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
      stylePlugin({
        cssModulesMatch: /\./,
        cssModulesOptions: {
          getJSON: () => {},
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }),
      compileTime(),
      html(rootPath, path.resolve(rootPath, './public/index.html'))
    ]
  },
  rootPath
};
