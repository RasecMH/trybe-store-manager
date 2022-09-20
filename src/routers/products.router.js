const express = require('express');
const productsController = require('../controllers/products.controller');
const validateProductsFields = require('../middlewares/validateProductsFields');

const router = express.Router();

router.get('/', productsController);

router.get('/:id', productsController);

router.get('/search?q=searchTerm', productsController);

router.post('/', validateProductsFields, productsController);

router.put('/:id', validateProductsFields, productsController);

router.delete('/:id', productsController);

module.exports = router;
