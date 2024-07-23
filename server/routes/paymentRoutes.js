const express = require('express');
const { createPaymentIntent } = require('../controllers/paymentController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.post('/create-payment-intent', protect, createPaymentIntent);

module.exports = router;