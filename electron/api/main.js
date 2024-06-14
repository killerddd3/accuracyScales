
/**
 * 主进程与渲染进程通信频道定义
 * Definition of communication channels between main process and rendering process
 */
const ipcApiRoute = {

  receive: 'controller.serialport.receive',
  error: 'controller.serialport.error',
  close: 'controller.serialport.close',
  requestError:'request.response.error'

}

module.exports = {
  ipcApiRoute
}

