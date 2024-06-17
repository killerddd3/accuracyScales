'use strict';


const { Service } = require('ee-core');
const request = require("../utils/request");
const {deviceDB} = require("../utils/jsonDB");
const Log = require("ee-core/log");
const constant = require("../utils/constant")
const result = require("../utils/result");

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
            traditional: true,//必须指定为true
            method: 'post',
            data
        })
        return result.ok(res.data)
    }

    async getDevice(){
        const devices = deviceDB.get('devices').value()
        return result.ok(devices)
    }

}

module.exports = ProjectService;
