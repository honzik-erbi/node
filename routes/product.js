var express = require('express');
var router = express.Router();
const productController = require("../Controllers/product")

router.get('/', productController.getAllProducts)
router.get('/:id', productController.getProductsByID)
router.post('/', productController.createProduct)
router.patch('/:id', productController.patchProduct)
router.put('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router;
