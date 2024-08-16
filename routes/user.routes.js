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