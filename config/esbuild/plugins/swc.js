const path = require('path');
const fs = require('fs');
const deepmerge = require('deepmerge');
const { transform, transformSync } = require('@swc/core');

const judgeTS = p => p.endsWith('.ts') || p.endsWith('.tsx');

/**
 * 尝试使用swc作为esbuild的loader，以解决esbuild的兼容下问题
 * @returns {{name: string, setup: setup}}
 */
module.exports = (options = {}, isAsync) => {
  return {
    name: 'esbuild:swc',
    setup: build => {
      build.onResolve({ filter: /\.([tj]sx?)$/ }, args => {
        const fullPath = path.resolve(args.resolveDir, args.path);
        return {
          path: fullPath
        };
      });
      build.onLoad({ filter: /\.([tj]sx?)$/ }, async args => {
        const code = fs.readFileSync(args.path, 'utf-8');
        const isTS = judgeTS(args.path);
        const isJSX = args.path.endsWith('x');

        const initialOptions = {
          jsc: {
            parser: {
              syntax: isTS ? 'typescript' : 'ecmascript',
              ...(isTS && isJSX ? { tsx: true } : {}),
              ...(!isTS && isJSX ? { jsx: true } : {})
            }
          },
          filename: args.path,
          sourceMaps: true,
          sourceFileName: args.path
        };

        let result;
        if (isAsync) {
          result = await transform(code, deepmerge(initialOptions, options));
        } else {
          result = transformSync(code, deepmerge(initialOptions, options));
        }
        return {
          contents: result.code,
          loader: 'js'
        };
      });
    }
  };
};
