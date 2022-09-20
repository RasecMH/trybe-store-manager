const express = require('express');
const productsController = require('../controllers/products.controller');

const router = express.Router();

router.get('/', productsController);

router.get('/:id', productsController);

router.get('/search?q=searchTerm', productsController);

router.post('/', productsController);

router.put('/:id', productsController);

router.delete('/:id', productsController);

module.exports = router;
