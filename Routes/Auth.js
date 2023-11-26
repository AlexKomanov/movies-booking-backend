const express = require('express');
const router = express.Router();
const User = require('../Models/UserSchema');
const errorHandler = require('../Middlewares/errorMiddleware');
const authTokenHandler = require('../Middlewares/checkAuthToken');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


router.get('/test', async (req, res) => {
    res.json({
        message: "Auth API is working!"
    })
})

function createResponse(ok, message, data) {
    return {
        ok,
        message,
        data,
    };
}

router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password} = req.body;
        const existingUser = await User.findOne({email: email})

        if(existingUser) {
            return res.status(409).json(createResponse(false, 'This Email already exists'));
        }

        const newUser = new User({
            name, password, email
        });
        
        await newUser.save();
        res.status(201).json(createResponse(true, "Registration Completed Successfully!"))
    } 
    catch (error) {
        next(error);
    }
})

router.post('/login', async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    
    if (!user) {
        return res.status(400).json(createResponse(false, 'Invalid credentials'));
    }

    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
        return res.status(400).json(createResponse(false, 'Invalid credentials'));
    }

    const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '30m' });
    res.cookie('authToken', authToken,  { httpOnly: true, secure: true, sameSite: 'None' });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'None' });

    res.status(200).json(createResponse(true, 'Login successful', {
        authToken,
        refreshToken
    }));

})

router.post('/sendotp', async (req, res, next) => {})

router.get('/checklogin', async (req, res, next) => {})


router.use(errorHandler);

module.exports = router;