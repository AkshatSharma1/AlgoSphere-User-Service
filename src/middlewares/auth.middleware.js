const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/server.config');
const UnauthorizedError = require('../errors/unauthorized.error'); // You'll need to create this error

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new UnauthorizedError('No token provided or token is not Bearer type'));
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user payload {id, roles} to the request object
        next();
    } catch (error) {
        return next(new UnauthorizedError('Invalid or expired token'));
    }
};

module.exports = authenticate;