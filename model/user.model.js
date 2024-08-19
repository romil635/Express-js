const mongoose =require ('mongoose')

const userSchema = mongoose.Schema({
     firstName : String, // short hand property
     lastName : {
          type : String, // long hand property
     },
     email : {
          type : String,
     },
     age : {
          type : Number,
     },
     hobbies:[{type:String}],
     address : {
          line1:String,
          line2:String,
          pincode:Number
     },
     isDelete:{
          type:Boolean,
          default:false
     }
},{
     versionKey:false,
     timestamps:true
});
module.exports = mongoose.model('users',userSchema)