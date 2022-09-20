const { salesService } = require('../services');
const { mapError } = require('../utils/errorMap');

// const listSales = async (req, res) => {};

// const listSaleById = async (req, res) => {};

const createSale = async (req, res) => {
  const saleData = req.body;
  const { type, message } = await salesService.createSale(saleData);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(201).json(message);
};

// const updateSaleById = async (req, res) => {};

// const deleteSaleById = async (req, res) => {};

module.exports = {
  // listSales,
  // listSaleById,
  createSale,
  // updateSaleById,
  // deleteSaleById,
};
