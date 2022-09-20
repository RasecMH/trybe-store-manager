const { salesModel } = require('../models');
const { validateSaleId } = require('./validations/validateValues');

const listSales = async () => {};

const listSaleById = async ({ id }) => {};

const createSale = async ({ id, name }) => {};

const updateSaleById = async ({ id }) => {};

const deleteSaleById = async ({ id }) => {};

module.exports = {
  listSales,
  listSaleById,
  createSale,
  updateSaleById,
  deleteSaleById,
};
