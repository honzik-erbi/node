var express = require('express');
var router = express.Router();
const bootsController = require("../controllers/boots")

router.get('/', bootsController.getAllBoots)
router.get('/:id', bootsController.getBootByID)
router.post('/', bootsController.createBoot)
router.patch('/:id', bootsController.patchBoot)
router.put('/:id', bootsController.updateBoot)
router.delete('/:id', bootsController.deleteBoot)

module.exports = router;
