const mongoose = require('mongoose');
const Schema = mongoose.Schema

let mst_Programmes = new Schema({

    ProgrammeID: { type: String },
    SourceProgrammeName: { type: String },
    ProgrammeName: { type: String },
    IsActive: { type: String },
    CreatedBy: { type: String },
    CreatedDate: { type: String },
    ModifiedBy: { type: String },
    ModifiedDate: { type: String }},
    
    {
        collection: 'mst_Programmes'
     })


module.exports = mongoose.model('mst_Programmes', mst_Programmes);    