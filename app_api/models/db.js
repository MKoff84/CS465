const mongoose = require('mongoose');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

const readLine = require('readline');

// Build the connection string and set the connection timeout
const connect = () => {
    setTimeout(() => mongoose.connect(dbURI), 1000);
};

// Monitor connection events
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Windows-specific graceful shutdown
if (process.platform === 'win32') {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('SIGINT', () => {
        process.emit('SIGINT');
    });
}

// Graceful shutdown
const gracefulShutdown = (msg) => {
    mongoose.connection.close()
        .then(() => {
            console.log(`Mongoose disconnected through ${msg}`);
        });
};

// Application termination
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart')
        .then(() => {
            process.kill(process.pid, 'SIGUSR2');
        });
});

// Application shutdown
process.on('SIGINT', () => {
    gracefulShutdown('app termination')
        .then(() => {
            process.exit(0);
        });
});

// Heroku shutdown
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown')
        .then(() => {
            process.exit(0);
        });
});

// Make initial connection
connect();

// Bring in the Mongoose schema
require('./travlr');