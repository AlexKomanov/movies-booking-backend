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

function createResponse(isOk, message, data) {
    return {
        isOk,
        message,
        data,
    };
}

router.post('/register', async (req, res, next) => {})

router.post('/login', async (req, res, next) => {})

router.post('/sendotp', async (req, res, next) => {})

router.get('/checklogin', async (req, res, next) => {})


// router.use(errorHandler);

module.exports = router;