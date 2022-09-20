const express = require('express');
const productsController = require('../controllers/products.controller');
const validateProductsFields = require('../middlewares/validateProductsFields');

const router = express.Router();

router.get('/', productsController.listProducts);

router.get('/:id', productsController.listProductById);

// router.get('/search?q=searchTerm', productsController.listProductsBySearchTerm);

router.post('/', validateProductsFields, productsController.createProduct);

// router.put(
//   '/:id',
//   validateProductsFields,
//   productsController.updateProductById,
// );

// router.delete('/:id', productsController.deleteProductById);

module.exports = router;
