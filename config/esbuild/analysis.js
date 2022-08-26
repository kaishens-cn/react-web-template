const esbuild = require('esbuild');
const baseConfig = require('./config');
const analysisBundle = require('./plugins/analysisBundle');

baseConfig.config.plugins.push(analysisBundle());

esbuild
  .build(baseConfig.config)
  .then(() => {})
  .catch(e => {
    process.exit(1);
  });
