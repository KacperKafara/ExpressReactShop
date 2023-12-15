const mongoose = require('mongoose');
const Category = require('./Model/Category');
const Product = require('./Model/Product');
const OrderStatus = require('./Model/OrderStatus');
const Order = require('./Model/Order');

mongoose.connect('mongodb://localhost:27017/aji-db');

async function run() {
    const category = await Category.create({
        name: 'Movie',
    });

    const product = await Product.create({
        name: 'aaa',
        description: 'bbb',
        price: 0.1,
        weight: 10.8,
        category: category,
    });

    const orderStatus = await OrderStatus.create({
        name: 'CANCELLED',
    });

    const order = await Order.create({
        orderStatus: orderStatus,
        username: 'Kacper',
        email: 'email@email.com',
        phoneNumber: '123456789',
        orders: [
            {
                product: product,
                quantity: 3,
            }
        ]
    });
}

run();