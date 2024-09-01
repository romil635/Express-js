const express = require('express');
const passport = require('passport');
const multer = require('multer');
const path = require('path');
const { register, login, todolist, updateProfile, deleteProfile, editProfile } = require('../controller/user.controller');

const userRoutes = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    }
});

const upload = multer({ storage });

// Route for home page
userRoutes.get('/', (req, res) => {
    res.send('<h1>Welcome to Home Page</h1> <p>Please <a href="/login">Login Now</a></p>');
});

// Render login page
userRoutes.get('/login', (req, res) => {
    res.render('login');
});

// Render register page
userRoutes.get('/register', (req, res) => {
    res.render('register');
});

// Handle user registration
userRoutes.post('/register', register);

// Handle user login with Passport.js
userRoutes.post('/login', passport.authenticate('local', {
    successRedirect: "/user",
    failureRedirect: '/login',
}));

// Render user list
userRoutes.get('/user', todolist);

// Render profile edit page
userRoutes.get('/user/edit/:userId', editProfile);

// Handle profile updates, including file uploads
userRoutes.post('/user/update/:userId', upload.single('profilePicture'), updateProfile);

// Handle user deletion
userRoutes.post('/user/delete/:userId', deleteProfile);

// Middleware to serve uploaded files
userRoutes.use('/uploads', express.static(path.join(__dirname, '../uploads')));

module.exports = userRoutes;
