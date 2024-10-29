const userService = require('../services/userService');

//회원가입
const register = async (req, res) => {
    try {
        const { name, password } = req.body;
        await userService.registerUser(name, password);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//로그인
const login = async (req, res) => {
    const { name, password } = req.body;
    try {
        const token = await userService.loginUser(name, password);
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(401).json({ message: error.message });
    }
};

module.exports = { register, login };