import run from './db/db_init.js';
run();


import express from 'express';
import bodyParser from 'body-parser';
import statusController from './controllers/statusController.js';
import categoryController from './controllers/categoryController.js';

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

app.use('/status', statusController);
app.use('/categories', categoryController);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})