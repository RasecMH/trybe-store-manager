const { productsModel } = require('../models');
const { validateProductId } = require('./validations/validateValues');

const listProducts = async () => {
  const result = await productsModel.getAll();
  return { type: null, message: result };
};

const listProductById = async (id) => {
  const error = await validateProductId(id);
  if (error.type) return error;

  const [result] = await productsModel.findById(id);
  return { type: null, message: result };
};

// const listProductsBySearchTerm = async ({ searchTerm }) => {};

const createProduct = async (name) => {
  const result = await productsModel.insert(name);
  return { type: null, message: { id: result, name } };
};

const updateProductById = async (id, name) => {
  const error = await validateProductId(id);
  if (error.type) return error;

  const result = await productsModel.updateById(id, name);
  return { type: null, message: result };
};

// const deleteProductById = async ({ id }) => {};

module.exports = {
  listProducts,
  listProductById,
  // listProductsBySearchTerm,
  createProduct,
  updateProductById,
  // deleteProductById,
};
