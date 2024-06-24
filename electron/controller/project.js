'use strict';

const { Controller } = require('ee-core');
const Log = require('ee-core/log');
const Services = require('ee-core/services');
/**
 * example
 * @class
 */
class ProjectController extends Controller {

  constructor(ctx) {
    super(ctx);
  }


  /**
   * 所有方法接收两个参数
   * @param args 前端传的参数
   * @param event - ipc通信时才有值。详情见：控制器文档
   */

  /**
   * test
   */
  async getAssayProject (data) {
    return await Services.get('project').getAssayProject(data);
  }

  async getAssayWay (data) {
    return await Services.get('project').getAssayWay(data);
  }

  async getSample (data) {
    return await Services.get('project').getSample(data);
  }

  async commitSample (data) {
    return await Services.get('project').commitSample(data);
  }

  async getDevice () {
    return await Services.get('project').getDevice();
  }
  async getDeviceConfig (data) {
    return await Services.get('project').getDeviceConfig(data);
  }
  async getLocalDeviceParam () {
    return await Services.get('project').getLocalDeviceParam();
  }
  async saveLocalDeviceParam (data) {
    return await Services.get('project').saveLocalDeviceParam(data);
  }
  async getLocalSampleParam (data) {
    return await Services.get('project').getLocalSampleParam(data);
  }
  async saveLocalSampleParam (data) {
    return await Services.get('project').saveLocalSampleParam(data);
  }

  async sendSample (data) {
    return await Services.get('project').sendSample(data);
  }
}

module.exports = ProjectController;
