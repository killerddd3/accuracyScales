const Low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require('path');
const Conf = require('ee-core/config');
const lodash = require('lodash');


const dbDir = path.join(Conf.getValue("api.appHome"),'data')
const deviceDB = Low(new FileSync(path.join(dbDir,'device.json')))
deviceDB.defaults({
    devices: [
        {
            deviceId:"METTLER_TOLEDO",
            deviceName:"梅特勒托利多",
            baudRate:9600,
            parity:'odd',
            dataBits:8,
            stopBits:1
        },
        {
            deviceId:"Sartorius",
            deviceName:"赛多利斯",
            baudRate:9600,
            parity:'odd',
            dataBits:8,
            stopBits:1
        }
    ]
}).write()


module.exports = {
    deviceDB
}
