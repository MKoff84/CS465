const express = require('express');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');

// Trips
router
    .route('/trips')
    .get(ctrlTrips.tripsList);

router
    .route('/trips/:tripCode')
    .get(ctrlTrips.tripsFindByCode);

module.exports = router;