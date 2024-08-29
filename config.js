const mongoose =require("mongoose");
const connect =mongoose.connect("mongodb://localhost:27017/login-tut");

//check database connect or not
connect.then(() => {
     console.log("Database connected successfully");
})
.catch(() => {
console.log("Database cannot be connected");
});

// crete a schema
const loginSchema = new mongoose.Schema({
     name:{
          type:String,
          required:true
     },
     password:{
          type:String,
          required:true
     }
});
// collection part
const collection = new mongoose.model("users",loginSchema);
module.exports = collection;