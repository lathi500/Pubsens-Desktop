const mongoose = require('mongoose');
const Schema = mongoose.Schema

let mst_Commercials = new Schema({

    CommercialID: { type: String },
    SourceCommercialName: { type: String },
    CommercialName: { type: String },
    IsActive: { type: String },
    CreatedBy: { type: String },
    CreatedDate: { type: String },
    ModifiedBy: { type: String },
    ModifiedDate: { type: String }},
    
    {
        collection: 'mst_Commercials'
     })


module.exports = mongoose.model('mst_Commercials', mst_Commercials);    