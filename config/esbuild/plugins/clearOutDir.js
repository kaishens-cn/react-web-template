const fs = require('fs');

/**
 * 编译前清空目录
 * @param path
 * @returns {{name: string, setup: setup}}
 */
module.exports = path => {
  return {
    name: 'Clear',
    setup: build => {
      build.onStart(() => {
        if (fs.existsSync(path)) {
          fs.rmSync(path, { recursive: true });
        }
      });
    }
  };
};
