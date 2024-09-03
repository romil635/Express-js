// const mongoose = require("mongoose")

// // mongoose Schema
// const userSchema = mongoose.Schema({
//     // firstName : String,   //short hand property
//     firstName:{
//         type:String,
//     },
//     lastName : {
//         type: String,
//     },
//     email:{
//         type: String,
//         unique:true,
//     },
//     password:{
//        type:String
//     },
//     profileImage:{
//        type:String,
//     },
//     age:{
//         type : Number
//     },
//     bod:{
//        type:String,
//     },
//     hobbies : [{type:String}],
//     address:{
//         line1 : String,
//         line2 : String,
//         pincode : Number
//     },
//     isDelete:{
//         type: Boolean,
//         default:false
//     }
// },{
//     versionKey:false,
//     timestamps:true
// });

// module.exports = mongoose.model('users' , userSchema)

// //install mongoose

const mongoose =require ('mongoose')

const userSchema = mongoose.Schema({
     firstName : String, // short hand property
     lastName : {
          type : String, // long hand property
     },
     email : {
          type : String,
     },
     password:{
        type:String,
     },
     mobileNo:{
        type:String,
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