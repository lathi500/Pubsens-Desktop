const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let users = new Schema({
  UserID: { type: String },
  RoleID: {type: String},
  FullName: {type: String },
  LLName:{type:String},
  uPassword:{ type:String},
  EmailId:{type:String},
  PhoneNumber:{ type:String},
  IsActive:{type:String},
  CreatedDate:{ type:Date },
  ModifiedBy:{type:String},
  ModifiedDate:{type:String},
  password_reset_dt:{type:String},
  RESET_DT:{ type:String}
  
}, {

  collection: 'mst_User'


})
module.exports = mongoose.model('users', users)
