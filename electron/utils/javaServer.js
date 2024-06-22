/**
 * create java server
 */
const path = require('path');
const Ps = require('ee-core/ps')
const cross = require("ee-core/cross");
const Log = require("ee-core/log");
const {JAVA_SERVER_NAME} = require("./constant")
const createJavaServer = async ()=> {
    // 服务名称，一般填写使用的语言
    const serviceName = "java";
    // jar包路径，getExtraResourcesDir方法会自动处理打包前和打包后路径。
    const jarPath = path.join(Ps.getExtraResourcesDir(), 'java/app/weighing.jar');
    const opt = {
        // 程序名称
        name: JAVA_SERVER_NAME,
        // 可执行程序路径，或本机的可执行命令
        cmd: path.join(Ps.getExtraResourcesDir(), 'java/jre/jre1.8.0_401/bin/java.exe'),
        // 程序目录，如jar文件所在目录
        directory: path.join(Ps.getExtraResourcesDir(), 'java/app'),
        // 可执行程序参数，如果配置中的端口被占用，则框架会随机生成一个。
        args: ['-jar',  '-Xms512M', '-Xmx512M', '-Xss512k',  `-Dlogging.file.path=${Ps.getLogDir()}`, `${jarPath}`],
        // 程序退出时，是否退出electron应用
        appExit: false,
    }


    // 运行程序，返回cross进程对象
    const entity = await cross.run(serviceName, opt);
    // 程序名称
    Log.info('server name:', entity.name);
    // 程序option配置
    Log.info('server config:', entity.config);
    // 程序服务地址
    Log.info('server url:', entity.getUrl());
    return entity

}

module.exports=createJavaServer
