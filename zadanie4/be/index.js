import run from './db/db_init.js';
await run();


import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import statusController from './controllers/statusController.js';
import categoryController from './controllers/categoryController.js';
import productController from './controllers/productController.js';
import orderController from './controllers/orderController.js';

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

app.use('/status', statusController);
app.use('/categories', categoryController);
app.use('/products', productController);
app.use('/orders', orderController);

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

process.on('SIGINT', () => {
    server.close(() => {
        mongoose.connection.close();
        console.log("DB connection closed.");
    })
})