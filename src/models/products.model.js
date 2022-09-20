// const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

// const insert = async (product) => {};

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  console.log(result);
  return result;
};

const findById = async (productId) => {
  const [result] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
  // console.log(result);
  return result;
};

// const findByName = async (productName) => {};

// const updateById = async (productId) => {};

// const deleteById = async (productId) => {};

module.exports = {
  // insert,
  getAll,
  findById,
  // findByName,
  // updateById,
  // deleteById,
};
