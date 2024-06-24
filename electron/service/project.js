'use strict';


const { Service } = require('ee-core');
const request = require("../utils/request");
const crossRequest = require("../utils/crossRequest");
const {deviceDB} = require("../utils/jsonDB");
const Log = require("ee-core/log");
const constant = require("../utils/constant")
const result = require("../utils/result");
const Cross = require("ee-core/cross");
const getmac = require('getmac').default
const Services = require('ee-core/services');

/**
 * 示例服务（service层为单例）
 * @class
 */
class ProjectService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    async getAssayProject(data){
        const res = await request({
            url: '/tscInspectTaskResult/addInspectItemPlan',
            method: 'post',
            data
        })
        return result.ok(res.data)
    }

    async getAssayWay(data){
        const res = await request({
            url: '/tscInspectTaskResult/addInspectMethodPlan',
            method: 'post',
            data
        })
        return result.ok(res.data)
    }

    async getSample(data){
        const res = await request({
            url: '/tscInspectTaskResult/addsamplePlan',
            method: 'post',
            data
        })
        return result.ok(res.data)
    }


    async commitSample(data){
        const res = await request({
            url: '/tscInspectTaskResult/receiveSample',
            method: 'post',
            data
        })
        return result.ok(res.data)
    }

    async getDevice(){
        const res = await crossRequest({
            url:"/serial/list",
            method: "get"
        })
        return result.ok(res.data)
    }

    async getDeviceConfig(data){
        const {id} = data
        const res = await crossRequest({
            url:`/serial/${id}`,
            method: "get"
        })
        return result.ok(res.data)
    }

    async getLocalDeviceParam(){
        const res = await crossRequest({
            url:"/serial/getAllocationStorage",
            method: "get",
            params:{mac:getmac()}
        })
        return result.ok(res.data)
    }

    async saveLocalDeviceParam(data){
        data.mac = getmac()
        const res = await crossRequest({
            url:"/serial/saveAllocationStorage",
            method: "post",
            data
        })
        return result.ok(res.data)
    }


    async getLocalSampleParam(data){
        data.mac = getmac()
        const res = await crossRequest({
            url:"/save/getUserSave",
            method: "get",
            params:data
        })
        return result.ok(res.data)
    }

    async saveLocalSampleParam(data){
        data.mac = getmac()
        const res = await crossRequest({
            url:"/save/setUserSave",
            method: "post",
            data
        })
        return result.ok(res.data)
    }

    async sendSample(data){
        const res = await request({
            url: '/rveCheckNotice/balanceDataReception',
            method: 'post',
            headers:{
                'Content-Type':'application/json;charset=utf-8'
            },
            data
        })
        return result.ok(res.data)
    }

}

module.exports = ProjectService;
