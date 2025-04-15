const express = require('express');
const productController = require('../controllers/productcon');
const Firm = require('../models/Firm');
const { route } = require('./vendorRoutes');

const router = express.Router();

router.post('/add-product/:firmId',productController.addProduct);
router.get('/:firmId/products',productController.getProductByFirm);
router.delete('/:productId',productController.deletedProductById);

module.exports = router;