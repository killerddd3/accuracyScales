'use strict';


const { Service } = require('ee-core');
const request = require("../utils/request");
const store = require("../utils/storage");
const Log = require("ee-core/log");
const constant = require("../utils/constant")
const result = require("../utils/result");

/**
 * 示例服务（service层为单例）
 * @class
 */
class UserService extends Service {
  constructor(ctx) {
    super(ctx);
  }

  async login(data) {
    const res = await request({
      url: '/login/login',
      headers: {
        isToken: false,
      },
      method: 'get',
      params: data
    })
    store.set(constant.TOKEN,res.data)
    return result.ok()
  }

  async isLogin(){
    const token = store.get(constant.TOKEN)
    return result.ok(!!token)
  }

  async logout(){
    store.clear()
    return result.ok()
  }

}

module.exports = UserService;
