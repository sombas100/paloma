const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'gbp',
        });

        res.status(201).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};