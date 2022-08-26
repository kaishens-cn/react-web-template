const esbuild = require('esbuild');
const baseConfig = require('./config');
const koa = require('koa');
const serveStatic = require('koa-static');
const livereload = require('livereload');
const path = require('path');
const fs = require('fs');
const open = require('open');
const hotUpdate = require('./plugins/hotUpdate');

const app = new koa();
app.use(serveStatic(path.resolve(baseConfig.rootPath, 'dist')));
app.use(async (ctx, next) => {
  await next();
  if (parseInt(ctx.status) === 404) {
    ctx.status = 200;
    ctx.body = fs.readFileSync(path.resolve(baseConfig.rootPath, 'dist/index.html'), 'binary');
  }
});

const lrServer = livereload.createServer();
lrServer.watch(path.resolve(baseConfig.rootPath, 'dist'));

// 配置热更新
baseConfig.config.watch = {
  onRebuild(error) {
    if (error) console.error('watch build failed:', error);
  }
};

// sourcemap
baseConfig.config.sourcemap = true;

baseConfig.config.plugins.push(hotUpdate(path.resolve(baseConfig.rootPath, 'dist/index.html')));

const port = 3000;
const url = `http://localhost:${port}/`;
open(url);

esbuild
  .build(baseConfig.config)
  .then(() => {
    // 这里重写html
    app.listen(port, () => {
      console.log(`> Local:    ${url}`);
    });
  })
  .catch(e => {
    process.exit(1);
  });
