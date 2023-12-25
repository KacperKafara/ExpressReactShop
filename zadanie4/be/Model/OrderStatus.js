import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderStatusSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: ['UNAPPROVED', 'APPROVED', 'CANCELLED', 'COMPLETED'],
    }
});

const OrderStatus = mongoose.model('OrderStatus', orderStatusSchema);

const OrderStatusValue = {
    UNAPPROVED: 1,
    APPROVED: 2,
    CANCELLED: 3,
    COMPLETED: 4
};

export { OrderStatus, OrderStatusValue };