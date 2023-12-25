import mongoose from 'mongoose';
import Category from '../Model/Category.js';
import { OrderStatus, OrderStatusValue } from '../Model/OrderStatus.js';

mongoose.connect('mongodb://localhost:27017/aji-db');

mongoose.connection.on('connected', async () => {
    try {
        await mongoose.connection.db.dropDatabase();
    } catch (error) {
        console.error('Error:', error);
        mongoose.connection.close();
    }
});

async function run() {
    const foodCategory = await Category.create({
        name: 'Food',
    });

    const chemicalCategory = await Category.create({
        name: 'Chemical Products',
    });

    const petCategory = await Category.create({
        name: 'Pet Products',
    });

    const spicesCategory = await Category.create({
        name: 'Spices',
    });

    const unapprovedStatus = await OrderStatus.create({
        name: 'UNAPPROVED',
    });

    const approvedStatus = await OrderStatus.create({
        name: 'APPROVED',
    });

    const cancelledStatus = await OrderStatus.create({
        name: 'CANCELLED',
    });

    const completedStatus = await OrderStatus.create({
        name: 'COMPLETED',
    });

    console.log(OrderStatusValue[completedStatus.name])
}


export default run;