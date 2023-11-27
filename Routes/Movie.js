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
    try {
        const { title, description, portraitImgUrl, landscapeImgUrl, rating, genre, duration } = req.body;
        const newMovie = new Movie({ title, description, portraitImgUrl, landscapeImgUrl, rating, genre, duration })
        await newMovie.save();
        res.status(201).json({
            ok: true,
            message: "Movie was added successfully"
        });
    }
    catch (err) {
        next(err) // Passes any type of error to the error handling middle are
    }
})

router.post('/addcelebtomovie', adminTokenHandler, async (req, res, next) => {
    try {
        const { movieId, celebType, celebName, celebRole, celebImage } = req.body;
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({
                ok: false,
                message: "Movie not found"
            });
        }
        const newCeleb = {
            celebType,
            celebName,
            celebRole,
            celebImage
        };
        if (celebType === "cast") {
            movie.cast.push(newCeleb);
        } else {
            movie.crew.push(newCeleb);
        }
        await movie.save();

        res.status(201).json({
            ok: true,
            message: "A celebrity was added successfully"
        });
    }
    catch (err) {
        next(err) // Passes any type of error to the error handling middle are
    }
})

router.post('/createscreen', adminTokenHandler, async (req, res, next) => {
    try {
        const { name, location, seats, city, screenType } = req.body; const newScreen = new Screen({
            name,
            location,
            seats,
            city: city.toLowerCase(),
            screenType,
            movieSchedules: []
        });

        await newScreen.save();

        res.status(201).json({
            ok: true,
            message: "Screen added successfully"
        });
    }
    catch (err) {
        next(err) // Passes any type of error to the error handling middle are
    }
})

router.post('/addmoviescheduletoscreen', adminTokenHandler, async (req, res, next) => {
    try {

    }
    catch (err) {
        next(err) // Passes any type of error to the error handling middle are
    }
})
router.post('/bookticket', authTokenHandler, async (req, res, next) => {
    try {

    }
    catch (err) {
        next(err) // Passes any type of error to the error handling middle are
    }
})
router.get('/movies', authTokenHandler, async (req, res, next) => {
    try {

    }
    catch (err) {
        next(err) // Passes any type of error to the error handling middle are
    }
})

router.get('/movies/:id', authTokenHandler, async (req, res, next) => {
    try {

    }
    catch (err) {
        next(err) // Passes any type of error to the error handling middle are
    }
})

router.get('/screensbycity', authTokenHandler, async (req, res, next) => {
    try {

    }
    catch (err) {
        next(err) // Passes any type of error to the error handling middle are
    }
})

router.use(errorHandler)

module.exports = router;