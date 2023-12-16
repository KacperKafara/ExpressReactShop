import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderStatusSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['PENDING', 'APPROVED', 'CANCELLED', 'COMPLETED'],
    }
});

const OrderStatus = mongoose.model('OrderStatus', orderStatusSchema);

export default OrderStatus;