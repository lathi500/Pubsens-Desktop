const mongoose = require('mongoose');
const Schema = mongoose.Schema

let ErrorLogs = new Schema({

    errorID: { type: String },
    errorAPI: { type: String },
    errorModule: { type: String },
    errorMsg: { type: String },
    errorDateTime: { type: String }},
    {
        collection: 'ErrorLogs'
    })


module.exports = mongoose.model('ErrorLogs', ErrorLogs);    