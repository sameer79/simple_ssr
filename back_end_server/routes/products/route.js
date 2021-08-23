const express = require('express');
const {check} = require('express-validator')

const productControllers = require('../../controllers/product/product_controller');

const router = express.Router();

router.get('/', productControllers.getAllProducts);
router.get('/properties', productControllers.getAllProperties)
router.get('/:id', productControllers.getProductById);

router.post('/create', [
    check('title').not().isEmpty(),
    check('description').not().isEmpty()
],  productControllers.createProduct);

router.delete('/:id', productControllers.deleteProductById);

module.exports = router;