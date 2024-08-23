const jwt = require ('jsonwebtoken');
const User = require('../module/user.model');
 
exports.verifyToken = async (req,res, next) =>{
     try{
          let authorization =req.headers['authorization'];
          if(!authorization)
          return res.json({message:'not authorization'});
     let token = authorization.split(' ')[1];
     let {userId} = await jwt.verify(token,process.evn.JWT_SECRET);
     let user = await User.findOne({_id:userId, isDelete:false})
     if(!user)
          return res.json({message:'user not found'})
     req.user = user;
     next();
     } 
     catch(err){
          console.log(err);
          res.status(500).json({message:"Server Error"});

     }

};