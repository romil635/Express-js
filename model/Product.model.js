// const mongoose = require("mongoose")

// // mongoose Schema
// const productSchema = mongoose.Schema({
//     title :{
//         type:String,
//     } ,
//     price:{
//         type:Number,
//     },
//     descripation: {
//         type:String,
//     } ,
//     discountPercentage:{
//         type:Number
//     },
//     category:{
//         type:String,
//     },
//     isDelete:{
//         type:Boolean,
//         default:false
//     }
// },{
//     versionKey:false,
//     timestamps:true
// });

// module.exports = mongoose.model('product', productSchema)





const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title : String,
    price : {
        type : Number
    },
    description:{
        type: String,
    },
}, 
{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('products', productSchema);