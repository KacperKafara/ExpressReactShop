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
        validate: {
            validator: v => {
                return /^\S+@\S+\.\S+$/.test(v);
            }
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: v => {
                return /^\d{9}$/.test(v);
            }
        },
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
                validate: {
                    validator: v => {
                        return Number.isInteger(v) && v >= 1;
                    }
                }
            }
        }
    ]
})

module.exports = mongoose.model('Order', orderSchema);