
/**
 * 主进程与渲染进程通信频道定义
 * Definition of communication channels between main process and rendering process
 */
const ipcApiRoute = {

  receive: 'controller.serialport.receive',
  requestError:'request.response.error'

}

module.exports = {
  ipcApiRoute
}

