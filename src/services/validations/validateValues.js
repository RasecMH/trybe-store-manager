const { productsModel, salesModel } = require('../../models');

const validateProductId = async (id) => {
  const [product] = await productsModel.findById(id);
  if (!product) return { type: 'ITEM_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: '' };
};

const validateSaleId = async (id) => {
  const sale = await salesModel.findById(id);
  if (!sale) return { type: 'ITEM_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: '' };
};

module.exports = {
  validateProductId,
  validateSaleId,
};
