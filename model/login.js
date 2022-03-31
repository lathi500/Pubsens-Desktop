const mongoose = require('mongoose');
const Schema = mongoose.Schema

let RegisterSchema = new Schema({

    UserName: { type: String },
    PassWord: { type: String },
    token: {type: String}},
     {
        collection: 'mst_Login'
     })


module.exports = mongoose.model('user', RegisterSchema);    