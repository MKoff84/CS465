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

module.exports = {
    tripsList,
    tripsFindByCode
};