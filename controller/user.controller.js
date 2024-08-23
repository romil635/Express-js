const User = require("../model/user.model");
const bcrypt = require("bcrypt"); 

exports.registerUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, isDelete: false });
        if (user) {
            return res.json({ message: 'User already exists' });
        }
        let hashPassword = await bcrypt.hash(req.body.password, 10);
        // console.log(hashPassword);
        user = await User.create({...req.body, password: hashPassword});
        res.status(201).json({ user, message:'Register Success...' });
    } catch (err) {
        console.log(err);
        res.status(500).json({message : 'Server Error'});
    }
};

exports.loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, isDelete: false });
        if(!user) {
            return res.json({ message: 'User Not Found...' });
        }
        let comparedPassword = await bcrypt.compare(req.body.password, user.password);
        // console.log(comparedPassword);
        if(!comparedPassword) {
            return res.json({ message: 'Email or Password does not matched' });
        }
        let token = await jwt.sign({userId:user._id},process.env.JWT_SECRET);
        res.status(200).json({ message:'Login Success...', user });
    } catch (err) {
        console.log(err);
        res.status(500).json({message : 'Server Error'});
    }
};
exports.getProfile = async (req,res) =>{
    try{
        res.json(req.user);
        }
        catch(err){
            console.log(err);
            res.status(500).json({message:'Server Error'});
            }
            };
            exports.updateProfile = async (req,res)=>{
                try{
                    let user = await User.findByIdAndUpdate(req.user._id,req.body,{new:true});
                    res.status(202).json({user,message:"User Profile update...."});
                    }catch(err){
                        console.log(err);
                        res.status(500).json({message:"Server Error"});
                    }
                };
            
