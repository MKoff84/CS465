const mongoose = require('mongoose');
const readlineSync = require('readline-sync');

require('./app_api/models/users');

const User = mongoose.model('users');

async function main() {
    try {
        const name = readlineSync.question('Administrator name: ').trim();

        const email = readlineSync.question('Administrator email: ')
            .trim()
            .toLowerCase();

        const password = readlineSync.question(
            'Administrator password: ',
            { hideEchoBack: true }
        );

        if (!name || !email || password.length < 12) {
            throw new Error(
                'Name, email, and a password of at least 12 characters are required.'
            );
        }

        await mongoose.connect('mongodb://127.0.0.1/travlr');

        const existing = await User.findOne({ email });

        if (existing) {
            throw new Error('An account with that email already exists.');
        }

        const user = new User({ name, email });
        await user.setPassword(password);
        await user.save();

        console.log('Administrator account created successfully.');
    } catch (err) {
        console.error('Setup failed:', err.message);
    } finally {
        await mongoose.disconnect();
    }
}

main();