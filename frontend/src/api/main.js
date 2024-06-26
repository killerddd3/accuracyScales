
/**
 * 主进程与渲染进程通信频道定义
 * Definition of communication channels between main process and rendering process
 */
const ipcApiRoute = {
  getSerialPortList: 'controller.serialport.getSerialPortList',
  connect: 'controller.serialport.connect',
  open: 'controller.serialport.open',
  receive: 'controller.serialport.receive',
}

export {
  ipcApiRoute
}

