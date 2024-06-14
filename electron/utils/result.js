const ok = (data)=>{
    return {
        code:200,
        message:"成功",
        data
    }
}

const fail = (message)=>{
    return {
        code:500,
        message,
        data:null
    }
}

module.exports = {
    ok,
    fail
}
