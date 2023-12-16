import mongoose from 'mongoose';
import OrderStatus from './OrderStatus.js';
import Product from './Product.js';

const { Schema } = mongoose;

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
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
