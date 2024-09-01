const User = require("../model/user.model");
const bcrypt = require('bcrypt');
const passport = require('passport');

//login a new user
exports.login = async (req, res) => {
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
          res.status(200).json({ message:'Login Success...', token });
    } catch (err) {
      console.error(err);
      res.render('register');
    }
  };
                        

// Register a new user
exports.register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, isDelete: false });
        if (user) {
            return res.status(400).json({ message: "User Already Exists." });
        }
        let hashpassword = await bcrypt.hash(req.body.password, 10);
        user = await User.create({ ...req.body, password: hashpassword });
        res.status(201).redirect('user');
    } catch (err) {
        console.error(err);
        res.render('register');
    }
};

// Render the list of users
exports.todolist = async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length > 0) {
            return res.render('user', { users });  // Pass the users array to the EJS template
        } else {
            res.status(400).send("No users found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ mesg: "Internal Server Error" });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;
        const user = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user, message: "User updated successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete user profile
exports.deleteProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Change user password
exports.changePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword, confirmPassword } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect old password' });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'New passwords do not match' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
// Update user profile with profile picture upload
exports.updateProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;

        // Hash the password if it's being updated
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        // Handle profile picture upload
        if (req.file) {
            updates.profilePicture = req.file.path; // Save the path of the uploaded file
        }

        const user = await User.findByIdAndUpdate(userId, updates, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user, message: "User updated successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Render the user profile for editing
exports.editProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.render('editProfile', { user }); // Pass the user data to the edit profile template
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete user profile
exports.deleteProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).redirect('/user'); // Redirect to the list of users after deletion
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Example special user (if needed)
exports.specialUser = async (req, res) => {
    try {
        let user = {
            firstName: "Romil",
            lastName: "rakholiay",
            email: "romil@.in",
            mobileNo: "9080876546",
            Address: {
                line1: "City Center",
                line2: "Syamdham Chowk  Surat"
            }
        }
        if (!user) {
            return res.render('user.ejs', { user });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
