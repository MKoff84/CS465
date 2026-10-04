const fs = require('fs');
const mongoose = require('mongoose');

// Connect to the MongoDB database
require('./db');

const Trip = require('./travlr');

// Read seed data from JSON file
var seed = fs.readFileSync('./data/trips.json', 'utf8');
var trips = JSON.parse(seed);

// Delete any existing records, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

// Wait for MongoDB connection, seed the database, then exit
mongoose.connection.once('connected', async () => {
    try {
        await seedDB();
        console.log('Database seeded successfully');
        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
});