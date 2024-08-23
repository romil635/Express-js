const express = require('express');
const userRoutes = express.Router();
const {
   registerUser,
   loginUser
} = require("../controller/user.controller");
const {verifyTokon} = require('../helpers/verifyTokon');

userRoutes.post('/register', registerUser);
userRoutes.post('/login',loginUser);
userRoutes.get('/me',verifyTokon, getProfile)


module.exports = userRoutes;