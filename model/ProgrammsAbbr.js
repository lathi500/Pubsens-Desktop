const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let programmes = new Schema({
  PGM_ABBR_ID: { type: String },
  PGM_Abbr: {type: String},
  AbbrType: {type: String },
  IsActive:{type:String},
  CreatedBy:{ type:String},
  CreatedDate:{ype:String},
  ModifiedBy:{type:String},
  ModifiedDate:{type:String}
  },
   {

  collection: 'mst_Programmes_Abbr'

})
module.exports = mongoose.model('programmesAbbr', programmes)