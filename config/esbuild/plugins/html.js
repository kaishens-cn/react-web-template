const path = require('path');
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

/**
 * 生成html文件
 * @returns {{name: string, setup: setup}}
 */
module.exports = (rootPath, htmlPath) => {
  return {
    name: 'html',
    setup: build => {
      build.onStart(() => {
        if (!build.initialOptions.metafile) {
          throw new Error('metafile is not enabled');
        }
        if (!build.initialOptions.outdir) {
          throw new Error('outdir must be set');
        }
      });
      build.onEnd(result => {
        const dom = new JSDOM(fs.readFileSync(htmlPath, 'utf-8'));

        for (const key in result.metafile.outputs) {
          const filePath = path.resolve(rootPath, key);
          const fileName = path.basename(filePath);
          const extName = path.extname(fileName);
          if (extName === '.js') {
            const script = dom.window.document.createElement('script');
            script.src = fileName;
            script.defer = true;
            dom.window.document.head.appendChild(script);
          }
          if (extName === '.css') {
            const link = dom.window.document.createElement('link');
            link.href = fileName;
            link.rel = 'stylesheet';
            dom.window.document.head.appendChild(link);
          }
        }

        // 输出html
        fs.writeFileSync(
          path.resolve(build.initialOptions.outdir, 'index.html'),
          dom.window.document.documentElement.outerHTML
        );
      });
    }
  };
};
