const esbuild = require('esbuild');
const path = require('path');
const baseConfig = require('./config');
const clearPlugin = require('./plugins/clearOutDir');
const swc = require('./plugins/swc');

baseConfig.config.plugins.push(clearPlugin(path.resolve(baseConfig.rootPath, './dist')));
// 生产环境使用swc来兼容更低版本的es语法
baseConfig.config.plugins.push(
  swc({
    jsc: {
      target: 'es5',
      externalHelpers: true,
      transform: {
        legacyDecorator: true,
        decoratorMetadata: true,
        react: {
          runtime: 'automatic',
          throwIfNamespace: true,
          useBuiltins: true,
          development: false
        }
      }
    }
  })
);

esbuild
  .build(baseConfig.config)
  .then(() => {})
  .catch(e => {
    process.exit(1);
  });
