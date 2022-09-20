const express = require('express');
const salesController = require('../controllers/sales.controller');
const validateSalesFields = require('../middlewares/validateSalesFields');

const router = express.Router();

router.get('/', salesController);

router.get('/:id', salesController);

router.post('/', validateSalesFields, salesController);

router.put('/:id', validateSalesFields, salesController);

router.delete('/:id', salesController);

module.exports = router;
