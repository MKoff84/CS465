const mongoose = require('mongoose');
const Trip = require('../models/travlr');

// GET: /trips
// Returns all trips
const tripsList = async (req, res) => {
    Trip
        .find({})
        .exec()
        .then((trips) => {
            if (!trips) {
                return res
                    .status(404)
                    .json({ "message": "trips not found" });
            } else {
                return res
                    .status(200)
                    .json(trips);
            }
        })
        .catch((err) => {
            return res
                .status(404)
                .json(err);
        });
};

const tripsFindByCode = async (req, res) => {
    Trip
        .findOne({ 'code': req.params.tripCode })
        .exec()
        .then((trip) => {
            if (!trip) {
                return res
                    .status(404)
                    .json({ "message": "trip not found" });
            } else {
                return res
                    .status(200)
                    .json(trip);
            }
        })
        .catch((err) => {
            return res
                .status(404)
                .json(err);
        });
};

/* POST: /api/trips
 * Creates a new trip in MongoDB.
 */
const tripsAddTrip = async (req, res) => {
    try {
        const {
            code,
            name,
            length,
            start,
            resort,
            perPerson,
            image,
            description
        } = req.body;

        // Verify that all required fields are provided.
        const requiredFields = [
            code, name, length, start,
            resort, perPerson, image, description
        ];

        if (requiredFields.some(value =>
            value === undefined ||
            value === null ||
            String(value).trim() === ''
        )) {
            return res.status(400).json({
                message: 'All trip fields are required.'
            });
        }

        // Prevent duplicate trip codes.
        const existingTrip = await Trip.findOne({ code });

        if (existingTrip) {
            return res.status(409).json({
                message: 'A trip with this code already exists.'
            });
        }

        const newTrip = await Trip.create({
            code,
            name,
            length,
            start,
            resort,
            perPerson: String(perPerson),
            image,
            description
        });

        return res.status(201).json(newTrip);

    } catch (err) {
        console.error('Error adding trip:', err);

        if (err.name === 'ValidationError' ||
            err.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid trip information.'
            });
        }

        return res.status(500).json({
            message: 'Unable to create trip.'
        });
    }
};

/* PUT: /api/trips/:tripCode
 * Updates an existing trip in MongoDB.
 */
const tripsUpdateTrip = async (req, res) => {
    try {
        const tripCode = req.params.tripCode;

        const trip = await Trip.findOne({ code: tripCode });

        if (!trip) {
            return res.status(404).json({
                message: 'Trip not found.'
            });
        }

        const fields = [
            'name',
            'length',
            'start',
            'resort',
            'perPerson',
            'image',
            'description'
        ];

        // Update only fields supplied in the request.
        fields.forEach((field) => {
            if (req.body[field] !== undefined) {
                trip[field] = req.body[field];
            }
        });

        // Keep the trip code unchanged.
        await trip.save();

        return res.status(200).json(trip);

    } catch (err) {
        console.error('Error updating trip:', err);

        if (err.name === 'ValidationError' ||
            err.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid trip information.'
            });
        }

        return res.status(500).json({
            message: 'Unable to update trip.'
        });
    }
};

/* DELETE: /api/trips/:tripCode
 * Removes an existing trip from MongoDB.
 */
const tripsDeleteTrip = async (req, res) => {
    try {
        const tripCode = req.params.tripCode;

        const deletedTrip = await Trip.findOneAndDelete({
            code: tripCode
        });

        if (!deletedTrip) {
            return res.status(404).json({
                message: 'Trip not found.'
            });
        }

        return res.status(200).json({
            message: 'Trip deleted successfully.',
            code: deletedTrip.code
        });

    } catch (err) {
        console.error('Error deleting trip:', err);

        return res.status(500).json({
            message: 'Unable to delete trip.'
        });
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};