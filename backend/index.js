import run from './db/db_init.js';
await run();


import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import statusController from './controllers/statusController.js';
import categoryController from './controllers/categoryController.js';
import productController from './controllers/productController.js';
import orderController from './controllers/orderController.js';
import cors from 'cors';

const whiteList = ['http://localhost:5174', 'http://localhost:5173'];

const corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(null, true);

            // callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    optionsSuccessStatus: 200
}

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));
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