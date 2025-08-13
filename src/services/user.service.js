const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/user.repository');
const { JWT_SECRET, JWT_EXPIRY } = require('../config/server.config');
const NotFoundError = require('../errors/notfound.error');
const BadRequestError = require('../errors/badRequest.error');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(userData) {
        try {
            const user = await this.userRepository.create(userData);
            const token = this.#generateToken(user._id, user.roles);
            return { user: { id: user._id, username: user.username, email: user.email }, token };
        } catch (error) {
            // Handle duplicate key errors
            if (error.code === 11000) {
                throw new BadRequestError(`User with this email or username already exists.`);
            }
            throw error;
        }
    }

    async login(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundError('User not found with email', email);
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new BadRequestError('Invalid credentials');
        }
        
        const token = this.#generateToken(user._id, user.roles);
        return { user: { id: user._id, username: user.username, email: user.email }, token };
    }

    #generateToken(id, roles) {
        return jwt.sign({ id, roles }, JWT_SECRET, {
            expiresIn: JWT_EXPIRY,
        });
    }
}

module.exports = UserService;