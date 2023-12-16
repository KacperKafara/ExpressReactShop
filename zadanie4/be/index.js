const run = require('./db/db_init');
run();


const express = require('express');
const bodyParser = require('body-parser');
const statusController = require('./controllers/statusController');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

app.use('/status', statusController);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})