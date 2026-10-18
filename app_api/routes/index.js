const express = require('express');
const router = express.Router();
const { expressjwt } = require('express-jwt');

const ctrlTrips = require('../controllers/trips');
const ctrlAuth = require('../controllers/authentication');

// Require a valid JWT for administrative operations
const requireAuth = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});

// Public trip listing and protected trip creation
router
    .route('/trips')
    .get(ctrlTrips.tripsList)
    .post(requireAuth, ctrlTrips.tripsAddTrip);

// Public trip details and protected modifications
router
    .route('/trips/:tripCode')
    .get(ctrlTrips.tripsFindByCode)
    .put(requireAuth, ctrlTrips.tripsUpdateTrip)
    .delete(requireAuth, ctrlTrips.tripsDeleteTrip);

// Administrator authentication
router.post('/login', ctrlAuth.login);

module.exports = router;