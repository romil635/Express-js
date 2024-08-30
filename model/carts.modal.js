const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  productsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
  quantity: {
     type: Number,
     default: 1
  },
  isDelete:{
     type: Boolean,
     default: false
  }
}
,{
     timestamps: true,
     versionKey:false
});

module.exports =mongoose.model('carts',cartSchema);