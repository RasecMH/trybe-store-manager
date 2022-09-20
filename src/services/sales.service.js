const { salesModel } = require('../models');
const { validateProductId } = require('./validations/validateValues');

// const listSales = async () => {};

// const listSaleById = async ({ id }) => {};

const createSale = async (saleData) => {
  const verifyProducts = await Promise
    .all(saleData.map((product) => validateProductId(product.productId)));
  
  const isValid = verifyProducts.find((error) => error.type !== null);
  
  if (isValid !== undefined) {
    return isValid;
  }

  const saleId = await salesModel.createSale();
  const insertResult = await salesModel.insert(saleId, saleData);
  return { type: null, message: { id: saleId, itemsSold: insertResult } };
  };

// const updateSaleById = async ({ id }) => {};

// const deleteSaleById = async ({ id }) => {};

module.exports = {
  // listSales,
  // listSaleById,
  createSale,
  // updateSaleById,
  // deleteSaleById,
};
