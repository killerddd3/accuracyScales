'use strict';

const { Controller } = require('ee-core');
const Log = require('ee-core/log');
const Services = require('ee-core/services');
/**
 * example
 * @class
 */
class SerialPortController extends Controller {

  constructor(ctx) {
    super(ctx);
  }


  /**
   * 所有方法接收两个参数
   * @param args 前端传的参数
   * @param event - ipc通信时才有值。详情见：控制器文档
   */

  /**
   * test
   */
  async getSerialPortList () {
    return await Services.get('serialport').getSerialPortList();
  }

  async connect (args) {
    return await Services.get('serialport').connect(args);
  }

  async open (args,event) {
    return await Services.get('serialport').open(event);
  }

  async close () {
    return await Services.get('serialport').close();
  }
  async stop () {
    return await Services.get('serialport').stop();
  }
}

module.exports = SerialPortController;
