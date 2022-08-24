const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

/**
 * 生成html文件
 * @returns {{name: string, setup: setup}}
 */
module.exports = htmlPath => {
  return {
    name: 'html',
    setup: build => {
      build.onEnd(result => {
        const dom = new JSDOM(fs.readFileSync(htmlPath, 'utf-8'));
        const script = dom.window.document.createElement('script');
        script.src = 'http://127.0.0.1:35729/livereload.js?snipver=1';
        dom.window.document.body.appendChild(script);

        fs.writeFileSync(htmlPath, dom.window.document.documentElement.outerHTML);
      });
    }
  };
};
