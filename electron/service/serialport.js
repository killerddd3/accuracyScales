'use strict';

const { Service } = require('ee-core');
const {SerialPort} =  require('serialport');
const CoreWindow = require('ee-core/electron/window');
const Log = require('ee-core/log');
const {ipcApiRoute} =  require('../api/main')
const { ByteLengthParser } = require('@serialport/parser-byte-length')
const result = require('../utils/result')
const {ServiceError} = require("../utils/exception");
/**
 * 示例服务（service层为单例）
 * @class
 */
class SerialPortService extends Service {
  port = null;
  constructor(ctx) {
    super(ctx);
  }

  async getSerialPortList() {
    const list  = await SerialPort.list()
    return result.ok(list);
  }

  async connect(args,event) {
    await this.close()
    const {path} = args
    //dataBits 数据位 stopBits 停止位
    this.port = new SerialPort({path,baudRate:9600,autoOpen:false,endOnClose:true,parity:'odd',dataBits:8,stopBits:1})
    return result.ok()
  }

  async close(){
    if(!!this.port && this.port.isOpen){
      this.port.close()
    }
    this.port = null
    return result.ok()
  }

   weightAnalysis(data) {
    // data = 'n-84.4763kg'
    // data = 'High卧槽'
    // data = 'cal.ext'
    // data = 'err.201'
    data = data.replace(/\s+/g, '').toLowerCase()
    if(data.includes('low')){
      throw new ServiceError('欠载')
    }
    if(data.includes('high')){
       throw new ServiceError('超载')
    }
    if(data.includes('cal.ext')){
       throw new ServiceError('外部校准')
    }
    if(data.includes('cal.int')){
       throw new ServiceError('内部校准')
    }
    if(data.includes('err')){
      const parts = data.split('err');
      throw new ServiceError('错误码' + parts.length > 1 ? parts[1] : '')
    }
    if(data.includes('+')){
      return data.substring(data.lastIndexOf('+') + 1, data.length)
    }
    if(data.includes('-')){
      return data.substring(data.lastIndexOf('-'), data.length)
    }
  }
  async open(event) {
    if(!this.port) return result.fail("请先连接")
    if(this.port.isOpen) return result.fail("已经开始采集")
    this.port.open()
    this.port.resume()

    const parser = this.port.pipe(new ByteLengthParser({ length: 22 }))
    parser.on('data',(data)=>{
      Log.info(data)
      const strData = Buffer.from(data).toString('utf-8')
      let response;
      try {
        const value = this.weightAnalysis(strData)
        response = result.ok(value)
      }catch (e) {
        response = result.fail(e.message)
      }
      CoreWindow.getMainWindow().webContents.send(ipcApiRoute.receive,response)

    })
    this.port.on('error',err=>{
      this.close()
      event.sender.send(ipcApiRoute.error,err)
    })
    this.port.on('close',err=>{
      event.sender.send(ipcApiRoute.close,err)
    })
    return result.ok()
  }
  async stop(event) {
    if(!this.port) return result.fail("请先连接")
    if(!this.port.isOpen) return result.fail("已经停止采集")
    this.port.close()
    return result.ok()
  }

}

module.exports = SerialPortService;
