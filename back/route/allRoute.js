const express = require('express');
const router = express.Router();
const { getStates, getData } = require('../controller/DashboardController')
router.post('/getstate',getStates)
router.post('/getdata',getData)

module.exports = router;