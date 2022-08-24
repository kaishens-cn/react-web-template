let startTime = 0;
let endTime = 0;

/**
 * 统计编译时间
 * @returns {{name: string, setup: setup}}
 */
module.exports = () => {
  return {
    name: 'compileTime',
    setup: build => {
      build.onStart(() => {
        startTime = new Date().getTime();
      });
      build.onEnd(result => {
        endTime = new Date().getTime();
        console.log('DONE esbuild finished' + ` ${endTime - startTime}ms`);
      });
    }
  };
};
