const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded._id).select('-password');

            next(); 
        } catch (error) {
            res.status(401).json({ message: 'No token found, Authorization denied.' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token found' });
    }
}