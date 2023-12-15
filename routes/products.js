var express = require('express');
var router = express.Router();
const productsController = require("../controllers/products")

router.get('/', productsController.getAllProducts)
router.get('/:id', productsController.getProductsByID)
router.post('/', productsController.createProduct)
router.patch('/:id', productsController.patchProduct)
router.put('/:id', productsController.updateProduct)
router.delete('/:id', productsController.deleteProduct)

module.exports = router;
