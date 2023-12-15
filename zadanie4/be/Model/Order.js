const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderStatus = require('./OrderStatus');
const Product = require('./Product')

const orderSchema = new Schema({
    approvalDate: {
        type: Date,
    },
    orderStatus: {
        type: OrderStatus.schema,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,

    },
    orders: [
        {
            product: {
                type: Product.schema,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            }
        }
    ]
})

module.exports = mongoose.model('Order', orderSchema);