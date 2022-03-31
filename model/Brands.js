const mongoose = require('mongoose');
const Schema = mongoose.Schema

let mst_Brands = new Schema({

    ChannelID: { type: String },
    SourceChannelName: { type: String },
    ChannelName: { type: String },
    VendorID: { type: String },
    IsActive: { type: String },
    CreatedBy: { type: String },
    CreatedDate: { type: String },
    ModifiedBy: { type: String },
    ModifiedDate: { type: String }},
    
    {
        collection: 'mst_Brands'
     })


module.exports = mongoose.model('mst_Brands', mst_Brands);    