const axios= require('axios')
const store = require('./storage')
const Log = require('ee-core/log');
const Conf = require('ee-core/config');
const {broadcastError} = require("./exception");
const qs = require('qs')
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
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: Conf.getValue("api.baseUrl"),
  // 超时
  timeout: 10000
})


// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  let token = store.get('token')
  if (!!token && !isToken) {
    config.headers['token'] = token // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  if(!config.headers['Content-Type']){
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
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
  Log.info('request：',config)
  return config
}, error => {
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    if(res.data && res.data.result){
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
        data:res.object||res.message
      }
      resolve(response)
    }).catch(error=>{
      const response = {
        code:500,
        message:error.message||'系统错误'
      }
      if(error.message === "未登录"){
        response.code = 403
        store.clear()
      }
      reject(response)
    })
  })

}


module.exports = request
