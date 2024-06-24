const { Application } = require('ee-core');
const Log = require('ee-core/log');
const javaServer = require("./utils/javaServer");
const store = require('./utils/storage')

class Index extends Application {

  constructor() {
    super();
    // this === eeApp;
  }

  /**
   * core app have been loaded
   */
  async ready () {
    await javaServer()
    // do some things
  }

  /**
   * electron app ready
   */
  async electronAppReady () {
    // do some things
  }

  /**
   * main window have been loaded
   */
  async windowReady () {
    // do some things
    // 延迟加载，无白屏
    const winOpt = this.config.windowsOption;
    if (winOpt.show == false) {
      const win = this.electron.mainWindow;
      win.once('ready-to-show', () => {
        win.show();
        win.focus();
      })
    }
  }

  /**
   * before app close
   */
  async beforeClose () {
    // do some things
    store.clear()
  }
}

Index.toString = () => '[class Index]';
module.exports = Index;
