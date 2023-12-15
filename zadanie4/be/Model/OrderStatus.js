const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderStatusSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['PENDING', 'APPROVED', 'CANCELLED', 'COMPLETED'],
    }
})

module.exports = mongoose.model('OrderStatus', orderStatusSchema);