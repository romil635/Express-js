// // const users = require('../user.json')  //=>static 
// const User = require('../model/user.model');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const passport = require('passport');

// //register user with profile image uploading
// exports.registerUser = async (req, res) => {
//    try {
//       let imagePath = " "  // file not exetute path so print empty string
//       let user = await User.findOne({ email: req.body.email, isDelete: false });
//       if (user) {
//          return res.json({ message: 'User already exist...' })
//       }
//       if(req.file){
//          imagePath = req.file.path.replace(/\\/g ,"/")  // regx change path to beacuse mac and linex path does not to word this -> \\ and change using regx exprestion path change " / "
//       }
//       let hashPassword = await bcrypt.hash(req.body.password, 10)
//       user = await User.create({ ...req.body, password: hashPassword  , profileImage:imagePath})
//       res.status(201).json({ user, message: 'Register success...' })
//    }
//    catch (err) {
//       console.log(err);
//       res.status(500).json({ message: 'Server Error' })
//    }
// }

// //login user
// exports.loginUser = async (req, res) => {
//    try {
//       let user = await User.findOne({ email: req.body.email, isDelete: false })
//       if (!user) {
//          return res.json({ message: 'User Not Found...' })
//       }
//       let comparedPassword = await bcrypt.compare(req.body.password, user.password)
//       if (!comparedPassword) {
//          return res.json({ message: 'Email or password does not matched...' })
//       }
//       let token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET)
//       console.log(token);// token genret to the console 

//       res.status(200).json({ message: "Login Success...", token })
//    }
//    catch (err) {
//       console.log(err);
//       res.status(500).json({ message: 'Server Error' })
//    }
// }

// //get profile
// exports.getProfile = async (req, res) => {
//    try {
//       // res.status(200).json({message: "Show user profile"})
//       res.json(req.user)
//    }
//    catch (err) {
//       console.log(err);
//       res.status(500).json({ message: 'Server Error' })
//    }
// }

// // update profile
// exports.updateProfile = async (req, res) => {
//    try {
//       let user = req.user;
//       user = await User.findByIdAndUpdate(user._id, { $set: req.body }, { new: true })
//       res.status(202).json({ user, message: "User profile update...." })
//    }
//    catch (err) {
//       console.log(err);
//       res.status(500).json({ message: 'Server Error' })
//    }
// }

// // task => soft delete
// exports.deleteUser = async (req, res) => {
//    try {
//       let user = req.user
//       if (!user) {
//          return res.status(404).json({ message: "user Not Found.." })
//       }
//       user = await User.findByIdAndUpdate(user._id, { isDelete: true }, { new: true })
//       res.status(200).json({ message: 'User delete successfully...' })
//    }
//    catch (err) {
//       console.log(err);
//       res.status(500).json({ message: 'Server Error' })
//    }
// };
// // Register User
// exports.registerUser = async (req, res) => {
//     try {
//       const { username, password } = req.body;
//       const hashedPassword = await bcrypt.hash(password, 10);
//       await User.create({ username, password: hashedPassword });
//       res.redirect('/login');
//     } catch (err) {
//       res.status(500).send('Error registering user');
//     }
//   };
  
//   // Login User
//   exports.loginUser = (req, res, next) => {
//     passport.authenticate('local', {
//       successRedirect: '/',
//       failureRedirect: '/login',
//     })(req, res, next);
//   };
  
//   // Logout User
//   exports.logoutUser = (req, res) => {
//     req.logout();
//     res.redirect('/login');
//   };





// corrent password =>corrent password
// corrent password update operation -> new password
// new password and comfirm password

// exports.specialUser = (req ,res) => {
// try{
//     let user = {
//         firstName:'romil',
//         lastName:'Rakholiya',
//         email:'romil@gmail.com',
//         age:20,
//         mobileNo:"12345678990",
//         hobbies:['coding','business','music']
//     };
//     let user = await User.findOne({firstName: req.query.name, isDelete:false});
//     if(!user){
//         return res.render('notfound.ejs')
// }
// }






const User = require("../model/user.model");

exports.addNewUser =async (req, res) => {
    try{
        let user = await User.findOne({email: req.body.email,isDelete:false});
        // console.log(user);
        if(user){
            return res.status(400).json({message: 'User already exist.....'});
        }
        user = await User.create(req.body);
        res.status(201).json({user, message: "User Added Success"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
        
    }
};

exports.getAllUsers =async (req, res) => {
    try{
        let users = await User.find({isDelete:false});
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
        
    }
};

exports.getUser =async (req, res) => {
    try{
        // let user = await User.findOne({firstName: req.query.firstName});
        // let user = await User.findOne({_id: req.query.userId});
        let user = await User.findById(req.query.userId);
        // console.log(user);
        if(!user) {
            return res.status(404).json({message: 'User not found.....'});
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
};

exports.updateUser = async (req, res)=>{
    try {
      let user = await User.findById(req.query.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user = await User.findByIdAndUpdate(user._id, {$set: req.body}, {new: true});
      res.status(202).json({ user, message: 'User update success'});
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  exports.deleteUser = async (req, res)=>{
    try {
      let user = await User.findById({_id:req.query.userId,isDelete:false});
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user = await User.findByIdAndUpdate(user._id , {isDelete:true},{new:true});
      res.status(200).json({ user, message: 'User Delete success'});
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };