const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = mongoose.model('users');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (
        typeof email !== 'string' ||
        typeof password !== 'string' ||
        !email.trim() ||
        !password
    ) {
        return res.status(400).json({
            message: 'Email and password are required.'
        });
    }

    try {
        const user = await User.findOne({
            email: email.trim().toLowerCase()
        }).select('+hash');

        if (!user || !(await user.validPassword(password))) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not configured.');

            return res.status(500).json({
                message: 'Authentication is unavailable.'
            });
        }

        const token = jwt.sign(
            {
                sub: user._id.toString()
            },
            process.env.JWT_SECRET,
            {
                algorithm: 'HS256',
                expiresIn: '1h'
            }
        );

        return res.status(200).json({
            token
        });

    } catch (err) {
        console.error('Login error:', err);

        return res.status(500).json({
            message: 'Unable to complete login.'
        });
    }
};

module.exports = {
    login
};