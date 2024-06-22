'use strict';


const { Service } = require('ee-core');
const request = require("../utils/request");
const crossRequest = require("../utils/crossRequest");
const {deviceDB} = require("../utils/jsonDB");
const Log = require("ee-core/log");
const constant = require("../utils/constant")
const result = require("../utils/result");
const Cross = require("ee-core/cross");

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
        await crossRequest({

        })
        const devices = deviceDB.get('devices').value()
        return result.ok(devices)
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
