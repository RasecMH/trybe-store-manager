const { salesService } = require('../services');
const { mapError } = require('../utils/errorMap');

const listSales = async (req, res) => {
  const { type, message } = await salesService.listSales();
  if (type) return res.status(mapError(type)).json(message);
  res.status(200).json(message);
};

const listSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.listSaleById(id);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(200).json(message);
};

const createSale = async (req, res) => {
  const saleData = req.body;
  const { type, message } = await salesService.createSale(saleData);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(201).json(message);
};

const updateSaleById = async (req, res) => {
  const { id } = req.params;
  const saleData = req.body;
  const { type, message } = await salesService.updateSaleById(id, saleData);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(200).json(message);
};

const deleteSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSaleById(id);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(204).json(message);
};

module.exports = {
  listSales,
  listSaleById,
  createSale,
  updateSaleById,
  deleteSaleById,
};
