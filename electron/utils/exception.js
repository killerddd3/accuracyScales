const Log = require("ee-core/log");
const window = require("ee-core/electron/window");

class ServiceError extends Error {
    constructor(message) {
        super(message);
        this.name = "ServiceError";
    }
}


const broadcastError = (error)=>{
    const channel = "request.response.error"
    window.getMainWindow().webContents.send(channel,error)
}



module.exports = {
    ServiceError,
    broadcastError
}
