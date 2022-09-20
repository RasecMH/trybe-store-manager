const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.get('/', salesController);

router.get('/:id', salesController);

router.post('/', salesController);

router.put('/:id', salesController);

router.delete('/:id', salesController);

module.exports = router;
