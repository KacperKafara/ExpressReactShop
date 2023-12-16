const express = require('express');
const statusService = require('../services/statusService');

const router = express.Router();

router.get('/', statusService.getAllStatuses);

module.exports = router