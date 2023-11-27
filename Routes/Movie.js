const express = require('express');
const router = express.Router();


const User = require('../Models/UserSchema')
const Movie = require('../Models/MovieSchema')
const Booking = require('../Models/BookingSchema')
const Screen = require('../Models/ScreenSchema')


const errorHandler = require('../Middlewares/errorMiddleware');
const authTokenHandler = require('../Middlewares/checkAuthToken');
const adminTokenHandler = require('../Middlewares/checkAdminToken');


function createResponse(ok, message, data) {
    return {
        ok,
        message,
        data,
    };
}

router.get('/test', async (req, res) => {
    res.json({
        message: "Movie api is working"
    })
})


router.post('/createmovie', adminTokenHandler, async (req, res, next) => {
    try{

    }
    catch (err) {
        next(err) // Passes any type of error to the error handling middle are
    }
})
router.post('/addcelebtomovie', adminTokenHandler, async (req, res, next) => {
    try{

    }
    catch (err) {
        next(err) // Passes any type of error to the error handling middle are
    }
})
router.post('/createscreen', adminTokenHandler, async (req, res, next) => {
    try{

    }
    catch (err) {
        next(err) // Passes any type of error to the error handling middle are
    }
})
router.post('/addmoviescheduletoscreen', adminTokenHandler, async (req, res, next) => {
    try{

    }
    catch (err) {
        next(err) // Passes any type of error to the error handling middle are
    }
})
router.post('/bookticket', authTokenHandler, async (req, res, next) => {
    try{

    }
    catch (err) {
        next(err) // Passes any type of error to the error handling middle are
    }
})
router.get('/movies', authTokenHandler, async (req, res, next) => {
    try{

    }
    catch (err) {
        next(err) // Passes any type of error to the error handling middle are
    }
})

router.get('/movies/:id', authTokenHandler, async (req, res, next) => {
    try{

    }
    catch (err) {
        next(err) // Passes any type of error to the error handling middle are
    }
})

router.get('/screensbycity', authTokenHandler, async (req, res, next) => {
    try{

    }
    catch (err) {
        next(err) // Passes any type of error to the error handling middle are
    }
})

router.use(errorHandler)

module.exports = router;