const express = require('express');
const { registerUser, authUser, getUserProfile, updateUserProfile, google } = require('../controllers/userController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile, updateUserProfile);
router.post('/google', google);

module.exports = router;