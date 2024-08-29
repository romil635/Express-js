require("dotenv").config();
const express = require('express');
const { default: mongoose } = require("mongoose");
const path =require("path");
const bcrypt =require("bcrypt")
const collection =require("./config")
const port = process.env.PORT

const app = express();
//convert data into json format
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.set('view engine','ejs');
app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.render("login")
});
app.get("/signup",(req,res)=>{
    res.render("signup");
});
// Register User
app.post("/signup", async (req,res)=>{
const deta ={
    name:req.body.username,
    password:req.body.password
}
const userdeta = await collection.insertMany(data);
console.log(userdeta);
});

app.listen(port,()=>{
    mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
    console.log(`server Start at http://localhost:${port}`)
})
