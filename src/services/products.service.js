const { productsModel } = require('../models');
const { validateProductId } = require('./validations/validateValues');

const listProducts = async () => {};

const listProductById = async ({ id }) => {};

const listProductsBySearchTerm = async ({ searchTerm }) => {};

const createProduct = async ({ id, name }) => {};

const updateProductById = async ({ id }) => {};

const deleteProductById = async ({ id }) => {};

module.exports = {
  listProducts,
  listProductById,
  listProductsBySearchTerm,
  createProduct,
  updateProductById,
  deleteProductById,
};
