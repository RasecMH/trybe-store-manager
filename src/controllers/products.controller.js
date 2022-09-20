const { productsService } = require('../services/index');
const { mapError } = require('../utils/errorMap');

const listProducts = async (req, res) => {
  const { type, message } = await productsService.listProducts();
  if (type) return res.status(mapError(type)).json(message);
  res.status(200).json(message);
};

const listProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.listProductById(id);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(200).json(message);
};

// const listProductsBySearchTerm = async (req, res) => {};

// const createProduct = async (req, res) => {};

// const updateProductById = async (req, res) => {};

// const deleteProductById = async (req, res) => {};

module.exports = {
  listProducts,
  listProductById,
  // listProductsBySearchTerm,
  // createProduct,
  // updateProductById,
  // deleteProductById,
};
