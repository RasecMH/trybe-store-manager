const salesModel = require('../models/sales.model');
const validateValues = require('./validations/validateValues');

const listSales = async () => {
   const result = await salesModel.getAll();
  return { type: null, message: result };
};

const listSaleById = async (id) => {
  const error = await validateValues.validateSaleId(id);
  if (error.type) return error;

  const result = await salesModel.findById(id);
  return { type: null, message: result };
};

const createSale = async (saleData) => {
  const verifyProducts = await Promise
    .all(saleData.map((product) => validateValues.validateProductId(product.productId)));
  
  const isValid = verifyProducts.find((error) => error.type !== null);
  
  if (isValid !== undefined) {
    return isValid;
  }

  const saleId = await salesModel.createSale();
  const insertResult = await salesModel.insert(saleId, saleData);
  return { type: null, message: { id: saleId, itemsSold: insertResult } };
  };

const updateSaleById = async (id, saleData) => {
  const verifyProducts = await Promise
    .all(saleData.map((product) => validateValues.validateProductId(product.productId)));
  
  const isValid = verifyProducts.find((error) => error.type !== null);
  
  if (isValid !== undefined) {
    return isValid;
  }

  const error = await validateValues.validateSaleId(id);
  if (error.type) return error;

  await salesModel.updateById(id, saleData);
  return { type: null, message: { saleId: id, itemsUpdated: saleData } };
};

const deleteSaleById = async (id) => {
  const error = await validateValues.validateSaleId(id);
  if (error.type) return error;

  const result = await salesModel.deleteById(id);
  return { type: null, message: result };
};

module.exports = {
  listSales,
  listSaleById,
  createSale,
  updateSaleById,
  deleteSaleById,
};
