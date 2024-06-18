
/**
 * 主进程与渲染进程通信频道定义
 * Definition of communication channels between main process and rendering process
 */
const ipcApiRoute = {
  getSerialPortList: 'controller.serialport.getSerialPortList',
  connect: 'controller.serialport.connect',
  open: 'controller.serialport.open',
  stop: 'controller.serialport.stop',
  receive: 'controller.serialport.receive',
  error: 'controller.serialport.error',
  close: 'controller.serialport.close',


  getAssayProject: 'controller.project.getAssayProject',
  getAssayWay: 'controller.project.getAssayWay',
  getSample: 'controller.project.getSample',
  getDevice: 'controller.project.getDevice',
  commitSample: 'controller.project.commitSample',
  sendSample: 'controller.project.sendSample',


  login: 'controller.user.login',
  isLogin: 'controller.user.isLogin',
  logout: 'controller.user.logout',
  getUserInfo: 'controller.user.getUserInfo',

  requestError:'request.response.error'

}


export {
  ipcApiRoute
}

