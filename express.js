
const express = require("express");
const app = express();
const morgan = require("morgan");
const userRoutes =require("./routes/user.routes")
// console.log(users);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false }));
app.get("/" , (req,res)=>{
     res.send(" Welcome To Express Server");
});
app.use("/users",userRoutes)

     
          app.listen(2024,()=>{
               console.log("Server Start at http://localhost:2024");
          });



