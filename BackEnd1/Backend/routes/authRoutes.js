const express = require('express');
const { registerUser, loginUser, verifyUser, logoutUser } = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify', verifyUser);
router.post('/logout', logoutUser);
module.exports = router;