const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('MongoDB Connected...'))
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;