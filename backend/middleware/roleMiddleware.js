// middleware/roleMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(403).send('Token required');
    }

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }
        req.user = user;
        next();
    });
};

const roleMiddleware = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).send('Access denied');
        }
        next();
    };
};

module.exports = { authMiddleware, roleMiddleware };
