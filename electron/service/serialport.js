'use strict';

const { Service } = require('ee-core');
const {SerialPort} =  require('serialport');
const CoreElectronWindow = require('ee-core/electron/window');
const Log = require('ee-core/log');



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
    return SerialPort.list();
  }

  async connect(args,event) {
    this.resetPort()
    const {path,baudRate} = args
    this.port = new SerialPort({path,baudRate,autoOpen:false,endOnClose:true})
  }

  resetPort(){
    if(!!this.port && this.port.isOpen){
      this.port.close()
      this.port = null
    }
  }

  async open(event) {
    this.port.open()
    const channel = 'controller.serialport.receive';
    this.port.on('data',(data)=>{
      CoreElectronWindow.getMainWindow().webContents.send(channel,data)
      // event.sender.send(channel,data)
    })
  }

}

module.exports = SerialPortService;
