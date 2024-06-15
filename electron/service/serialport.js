'use strict';

const { Service } = require('ee-core');
const {SerialPort} =  require('serialport');
const CoreWindow = require('ee-core/electron/window');
const Log = require('ee-core/log');
const {ipcApiRoute} =  require('../api/main')
const { ByteLengthParser } = require('@serialport/parser-byte-length')
const result = require('../utils/result')
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
    const {path,baudRate} = args
    //dataBits 数据位 stopBits 停止位
    this.port = new SerialPort({path,baudRate,autoOpen:false,endOnClose:true,parity:'even',dataBits:8,})
    return result.ok()
  }

  async close(){
    if(!!this.port && this.port.isOpen){
      this.port.close()
    }
    this.port = null
    return result.ok()
  }


  async open(event) {
    if(!this.port) return result.fail("请先连接")
    if(this.port.isOpen) return result.fail("已经连接")
    this.port.open()
    this.port.resume()

    const parser = this.port.pipe(new ByteLengthParser({ length: 8 }))
    parser.on('data',(data)=>{
      const strData = Buffer.from(data).toString('utf-8')
      CoreWindow.getMainWindow().webContents.send(ipcApiRoute.receive,strData)

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

}

module.exports = SerialPortService;
