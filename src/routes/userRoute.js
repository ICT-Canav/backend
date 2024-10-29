const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register); //회원가입
router.post('/login', userController.login); //로그인

module.exports = router;