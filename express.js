// ******************* Lecture-14 (image Uploading using thrid party library => multer)  ***********************
require("dotenv").config();
const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require("mongoose")
const port = process.env.PORT;
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
const userRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/product.routes')
const cartsRouts = require('./routes/carts.routs')
const oderRoutes =require('./')
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/public/images",express.static(path.join(__dirname, "public/images")))
app.use("/public",express.static(path.json(__dirname,"public")))
app.set("view engine" , 'ejs')


app.get("/", (req, res) => {
  res.send("welcome to express server")
})

// user Routes
app.use('/api/user', userRoutes)


// Product Routes
app.use('/api/product', productRoutes)
// carts Routes
app.use('/api/carts',cartsRouts)
// Oder Routs
app.use('/api/oder',oderRoutes)
module.exports = (passport) => {
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: 'Incorrect username.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) return done(null, user);

        return done(null, false, { message: 'Incorrect password.' });
      } catch (err) {
        return done(err);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};


app.listen(port, () => {
  // Database connection -> mongoose function
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Database connection established sucess...")
    })
    .catch((err) => console.log(err));
console.log(`Server start at http://localhost:${PORT}`);
})


// -------------------Today task --------------------------
// Delete User        
//Change passWord
//Forget passWord => otp genreate => email(nodemailer) / message




//git checkout -b branch_name (create New branch)
//git add .
//git commit -m "your commit"
//git push -u origin branch_name


