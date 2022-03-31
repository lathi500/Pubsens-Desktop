const mongoose = require('mongoose');
const Schema = mongoose.Schema

let mst_Advertisers = new Schema({

    AdvertiserID: { type: String },
    SourceAdvertiserName: { type: String },
    AdvertiserName: { type: String },
    IsActive: { type: String },
    CreatedBy: { type: String },
    CreatedDate: { type: String },
    ModifiedBy: { type: String },
    ModifiedDate: { type: String }},

    {
        collection: 'mst_Advertisers'
    })


module.exports = mongoose.model('mst_Advertisers', mst_Advertisers);    