require('dotenv').config()
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path')
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
port= process.env.PORT
app.set("view engine",'ejs')
const ejs = require('ejs');
const mongoose = require('mongoose')

app.use(session({ 
    secret: 'secret', 
    resave: false, 
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl:"mongodb+srv://sqromilrakholiya:rsrakholiya@cluster0.zgttq.mongodb.net/todolist",collectionName:"sessions"}),
    cookie:{
        maxAge:1000*60*60*12   
     } 
}));

// const secret = process.env.JWT_SECRET

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev')) 
 
    
const userRoutes = require('./routes/user.routes');

app.use('/',userRoutes)


app.listen(port, () => {
    // Database connection -> mongoose function
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {console.log("Database connection established sucess...")})
      .catch((err) => console.log(err));
  console.log(`Server start at http://localhost:${port}`);
  })
  