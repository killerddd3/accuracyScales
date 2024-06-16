'use strict';

/**
 * 生产环境配置，覆盖 config.default.js
 */
module.exports = (appInfo) => {
  const config = {};

  /**
   * 开发者工具
   */
  config.openDevTools = false;

  /**
   * 应用程序顶部菜单
   */
  config.openAppMenu = true;

  /**
   * jobs
   */
  config.jobs = {
    messageLog: false
  };

  config.api = {
    appHome:appInfo.execDir,
    baseUrl:"http://121.89.171.228:8081/hangtian-service"
  }
  return {
    ...config
  };
};
