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

const listProductsBySearchTerm = async (req, res) => {
  const { q } = req.query;
  console.log(q);
  console.log('passou');
  const products = await productsService.listProductsBySearchTerm(q);

  return res.status(200).json(products);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.createProduct(name);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(201).json(message);
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService.updateProductById(id, name);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(200).json(message);
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProductById(id);
  if (type) return res.status(mapError(type)).json({ message });
  res.status(204).json(message);
};

module.exports = {
  listProducts,
  listProductById,
  listProductsBySearchTerm,
  createProduct,
  updateProductById,
  deleteProductById,
};
