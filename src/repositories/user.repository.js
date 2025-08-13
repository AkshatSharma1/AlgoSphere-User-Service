const User = require('../models/user.model');

class UserRepository {
    async create(userData) {
        return await User.create(userData);
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async findById(id) {
        return await User.findById(id).select('-password'); // Exclude password
    }
}

module.exports = UserRepository;