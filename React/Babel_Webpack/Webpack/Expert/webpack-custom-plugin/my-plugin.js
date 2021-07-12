class Myplugin {
  //-1-
  constructor(options) {
    //-2-
    this.options = options;
  }
  apply(compiler) {
    //-3-
    compiler.hooks.done.tap('MyPlugin', () => {
      //-4-
      console.log('bundling completed');
    });
    compiler.hooks.emit.tap('MyPlugin', (complication) => {
      //-5-
      let res = '';
      for (const filename in complication.assets) {
        //-6-
        if (this.options.showSize) {
          const size = complication.assets[filename].size();
          res += `${filename}(${size})\n`;
        } else {
          res += `${filename}\n`;
        }
      }
      complication.assets['fileList.txt'] = {
        //-7-
        source: function () {
          return res;
        },
        size: function () {
          return res.length();
        },
      };
    });
  }
}

module.exports = Myplugin;
