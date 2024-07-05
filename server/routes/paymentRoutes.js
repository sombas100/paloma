const express = require('express');
const { createPaymentIntent } = require('../controllers/paymentController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createPaymentIntent);

module.exports = router;