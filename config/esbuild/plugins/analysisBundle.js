const path = require('path');
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

/**
 * 生成bundle分析图
 * @returns {{name: string, setup: setup}}
 */
module.exports = () => {
  return {
    name: 'bundle:analysis',
    setup: build => {
      build.onStart(() => {
        if (!build.initialOptions.metafile) {
          throw new Error('metafile is not enabled');
        }
      });
      build.onEnd(result => {
        for (const key in result.metafile.outputs) {
          console.log(result.metafile.outputs[key].inputs);
        }
      });
    }
  };
};
