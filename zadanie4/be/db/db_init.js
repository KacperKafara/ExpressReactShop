const mongoose = require('mongoose');
const Category = require('../Model/Category');
const OrderStatus = require('../Model/OrderStatus');

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

    const pendingStatus = await OrderStatus.create({
        name: 'PENDING',
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
}


module.exports = run;