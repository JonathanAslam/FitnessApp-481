// for login and signup routes, using JWT tokens and cookies to persist data on website
const express = require('express');
const router = express.Router(); 
const bcrypt = require('bcryptjs'); // for hashing paswords
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/userModels');



// Signup route
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash password (use 10 round salt for hashing, anything more is probably overkill for our case)
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create new user
        user = new User({
            username,
            email,
            password: hashedPassword,   // make sure to store hashed password, not plaintext

        });
        await user.save();

        // Create and sign JWT token - JWT token will be used to verify user identity for protected routes
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,                                                   // dont allow js to access, only http
            secure: process.env.NODE_ENV === "production",                    // only http in production
            // sameSite: "strict",                                            // prevent CSRF (look up, provided by chatGPT)
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // use none for production and lax (between strict and none) for dev
            maxAge: 60 * 60 * 1000                                            // 1 hr cookie lifetime, change if needed
        });
        
        // Respond with user info (no token in JSON) since we are using cookies 
        res.status(201).json({
            message: 'Signup successful',
            user: { id: user._id, username: user.username, email: user.email },
        }); 

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


// Login route

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    try {
        // check if email is found
        let user = await User.findOne({ email });
        // no user --> return error
        if (!user) {
            return res.status(400).json({ message: 'Invalid login credentials' });
        }
        // compare password given to the password associated with the user account
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid login credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // create jwt

        // using http-only cookies for secure data persistance, keep away from javascript and only allow by http
        res.cookie("token", token, {
            httpOnly: true,                                                   // dont allow js to access, only http
            secure: process.env.NODE_ENV === "production",                    // only http in production
            // sameSite: "strict",                                            // prevent CSRF (look up, provided by chatGPT)
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // use none for production and lax (between strict and none) for dev
            maxAge: 60 * 60 * 1000                                            // 1 hr cookie lifetime, change if needed
        });

        res.json({
            message: 'Login successful',
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        res.status(500).send('Server error');
    }
});


// Logout route
router.post('/logout', async (req, res) => {
    // clear cookie from browser, will ensure user is logged out ON PAGE RELOAD, make sure to force reload the webpage after logout button pressed
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // use none for production and lax (between strict and none) for dev
        path: '/'                                                         // Important: must match the path used when setting the cookie
     })

    res.json({ message: 'Logout successful' });
});


module.exports = router;


