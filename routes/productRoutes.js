const express = require('express');
const productController = require('../controllers/productcon');
const Firm = require('../models/Firm');
const { route } = require('./vendorRoutes');

const router = express.Router();

router.post('/add-product/:firmId',productController.addProduct);
router.get('/:firmId/products',productController.getProductByFirm);
router.delete('/:productId',productController.deletedProductById);
router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));

})

module.exports = router;