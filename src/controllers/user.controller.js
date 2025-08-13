const UserService = require('../services/user.service');
const { StatusCodes } = require('http-status-codes');

const userService = new UserService();

async function register(req, res, next) {
    try {
        const { username, email, password } = req.body;
        const result = await userService.register({ username, email, password });
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'User registered successfully',
            data: result,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const result = await userService.login(email, password);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'User logged in successfully',
            data: result,
            error: {}
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login
};