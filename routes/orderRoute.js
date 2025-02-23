const express = require('express');
const orderController = require('../controllers/ordercon');
const Firm = require('../models/Firm');
const { route } = require('./vendorRoutes');

const router = express.Router();

router.post('/add-order/:firmId',orderController.orderItems);
router.get('/view-order/:firmId',orderController.viewOrders);

module.exports = router
