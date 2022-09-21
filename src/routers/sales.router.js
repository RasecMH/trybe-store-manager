const express = require('express');
const salesController = require('../controllers/sales.controller');
const validateSalesFields = require('../middlewares/validateSalesFields');

const router = express.Router();

router.get('/', salesController.listSales);

router.get('/:id', salesController.listSaleById);

router.post('/', validateSalesFields, salesController.createSale);

router.put('/:id', validateSalesFields, salesController.updateSaleById);

router.delete('/:id', salesController.deleteSaleById);

module.exports = router;
