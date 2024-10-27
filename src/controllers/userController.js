const userService = require('../services/userService');

const register = async (req, res) => {
    try {
        const { name, password } = req.body;
        await userService.registerUser(name, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        const token = await userService.loginUser(name, password);
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

module.exports = { register, login };