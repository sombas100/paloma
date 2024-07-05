const Order = require('../models/order');

exports.addOrderItems = async (req, res) => {
    const {
        orderItems,
        paymentMethod,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items exist' });
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            paymentMethod,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        try {
            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};

exports.getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id).populate('user', 'name email');

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOrderToPaid = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id);
        const { id, status, update_time, email_address } = req.body

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: id,
                status: status,
                update_time: update_time,
                email_address: email_address,
            };

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id})
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};