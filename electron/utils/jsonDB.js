const Low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path');
const Conf = require('ee-core/config');
const lodash = require('lodash');


const dbDir = path.join(Conf.getValue("api.appHome"),'data')
const deviceDB = Low(new FileSync(path.join(dbDir,'device.json')))
deviceDB.defaults({ devices: [] }).write()
module.exports = {
    deviceDB
}
