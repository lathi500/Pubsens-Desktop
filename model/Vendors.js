const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 

let vendors = new Schema({
  VendorID: {type: String},
  VendorName: {type: String},
  IsActive: { type: String},
  CreatedBy:{type:String},
  CreatedDate:{ type:String},
  ModifiedBy:{type:String},
  ModifiedDate:{type:String }
  
}, 
{
  collection: 'mst_Vendors'
})
module.exports = mongoose.model('vendors', vendors)