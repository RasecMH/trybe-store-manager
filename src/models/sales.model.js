// const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

const createSale = async () => {
  const [result] = await connection.execute(
    'INSERT INTO sales(date) VALUE(NOW())',
  );
  return result.insertId;
};

const insert = async (saleId, saleData) => {
  await connection.execute(
    `INSERT INTO sales_products(sale_id, product_id, quantity) VALUES ${saleData
      .map(() => '(?, ?, ?)')
      .join(',')}`,
    saleData
      .map((product) => [saleId, product.productId, product.quantity])
      .flat(1),
  );

  return saleData;
};

// const getAll = async () => {};

// const findById = async (saleId) => {};

// const updateById = async (saleId) => {};

// const deleteById = async (saleId) => {};

module.exports = {
  createSale,
  insert,
  // getAll,
  // findById,
  // updateById,
  // deleteById,
};
