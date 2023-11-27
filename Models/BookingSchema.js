const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    showTime: {
        type: String,
        required: true
    },
    showDate: {
        type: Date,
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie', // Reference to the Movie model
        required: true
    },
    screenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Screen', // Reference to the Screen model
        required: true
    },
    seats: [
        {
            // { row: 'D', col: 0, seat_id: '10', price: 300 }

            // row: {
            //     type: String,
            //     required: true
            // },
            // col: {
            //     type: Number,
            //     required: true
            // },
            seat_id: {
                type: String,
                required: true
            },
            type: String,
            status: String,
            // type: {
            //     type: String,
            //     required: true
            // }
            
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    paymentId: {
        type: String,
        required: true
    }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;