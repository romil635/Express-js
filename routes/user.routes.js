// const express = require("express")
// const userRoutes = express.Router()
// const { registerUser, loginUser, getProfile, updateProfile, deleteUser, changePassword } = require("../controller/user.controller")
// const { verifyToken } = require('../helpers/verifyToken')
// const { upload } = require('../helpers/imageUpload')

// userRoutes.post('/register', upload.single('profileImage'), registerUser)
// userRoutes.post('/login', loginUser)
// userRoutes.get('/me', verifyToken, getProfile)
// userRoutes.put('/update-profile', verifyToken, updateProfile)
// userRoutes.delete('/delete-user', verifyToken, deleteUser)



// module.exports = userRoutes;


const express = require('express');
const userRoutes = express.Router();
const {
    addNewUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
} = require("../controller/user.controller")

userRoutes.post('/', addNewUser)

userRoutes.get('/', getAllUsers)

userRoutes.get("/get-user", getUser)

userRoutes.patch("/:id", updateUser)

userRoutes.delete("/:id", deleteUser)

module.exports = userRoutes;
