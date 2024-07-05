const express = require('express');
const { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders } = require('../controllers/orderController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, updateOrderToPaid);

module.exports = router;