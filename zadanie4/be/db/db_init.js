import mongoose from 'mongoose';
import Category from '../Model/Category.js';
import Product from '../Model/Product.js';
import Order from '../Model/Order.js';
import { OrderStatus } from '../Model/OrderStatus.js';

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

    const product1 = await Product.create({
        name: 'product1',
        description: 'product1',
        price: 10,
        weight: 20,
        category: petCategory,
    });

    const product2 = await Product.create({
        name: 'product2',
        description: 'product2',
        price: 15,
        weight: 25,
        category: spicesCategory,
    });

    const product3 = await Product.create({
        name: 'product3',
        description: 'product3',
        price: 20,
        weight: 30,
        category: foodCategory,
    });

    const order = await Order.create({
        approvalDate: new Date('2023-12-26'),
        orderStatus: unapprovedStatus,
        username: 'User',
        email: 'email@email.com',
        phoneNumber: '123456789',
        products: [
            {
                product: product1,
                quantity: 2,
            },
            {
                product: product2,
                quantity: 4,
            }
        ]
    });
}


export default run;