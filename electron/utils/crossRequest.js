const axios= require('axios')
const Log = require('ee-core/log');
const {broadcastError} = require("./exception");
const qs = require('qs')
const {JAVA_SERVER_NAME} = require("./constant")
const Cross = require("ee-core/cross");

/**
 * 参数处理
 * @param {*} params  参数
 */

function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result
}


// 创建axios实例
const service = axios.create({
  // 超时
  timeout: 10000
})


// request拦截器
service.interceptors.request.use(config => {
  config.baseURL = Cross.getUrl(JAVA_SERVER_NAME)
  if(!config.headers['Content-Type']){
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
  }

  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?' + qs.stringify(config.params,{ arrayFormat: 'repeat' });
    config.params = {};
    config.url = url;
  }

  if(config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=utf-8'){
    if (config.method === 'post' || config.method === 'put') {
         config.data = typeof config.data === 'object' ? qs.stringify(config.data,{ arrayFormat: 'repeat', allowDots: true }) : config.data
    }
  }else if(config.headers['Content-Type'] === 'application/json;charset=utf-8'){
    if (config.method === 'post' || config.method === 'put') {
      config.data =  typeof config.data === 'object' ? JSON.stringify(config.data) : config.data
    }
  }
  return config
}, error => {
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    if(res.data && res.data.code === 200){
      return Promise.resolve(res.data)
    }else{
      return Promise.reject(res.data)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

const request =  (options)=>{
  return new Promise((resolve, reject) => {
    service(options).then(res=>{
      const response = {
        code:200,
        data:res.data||res.msg
      }
      resolve(response)
    }).catch(error=>{
      const response = {
        code:500,
        message:error.msg||'系统错误'
      }
      reject(response)
    })
  })

}


module.exports = request
