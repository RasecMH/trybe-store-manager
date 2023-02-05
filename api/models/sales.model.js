const camelize = require('camelize');
const connection = require('./connection');

const createSale = async () => {
  const [result] = await connection.execute(
    'INSERT INTO sales(date) VALUE(NOW())',
  );
  return result.insertId;
};

const insert = async (saleId, saleData) => {
  await connection.execute(
    `INSERT INTO sales_products(sale_id, product_id, quantity) VALUES ${saleData.map(
      () => '(?, ?, ?)',
    )}`,
    saleData
      .map((product) => [saleId, product.productId, product.quantity])
      .flat(1),
  );

  return saleData;
};

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT 
      sales_products.sale_id,
      sales.date,
      sales_products.product_id,
      sales_products.quantity
    FROM sales_products
    JOIN sales ON sales_products.sale_id = sales.id
    ORDER BY sales_products.sale_id, sales_products.product_id`,
  );
  return camelize(result);
};

const findById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT date, product_id, quantity
    FROM sales_products
    JOIN sales ON id = sales_products.sale_id
    WHERE id = ?
    ORDER BY product_id`,
    [saleId],
  );
  console.log(result);
  return camelize(result);
};

const updateById = async (saleId, saleData) => {
  await Promise.all(
    saleData.map(async (product) =>
      connection.execute(
        `UPDATE sales_products SET quantity = ?
           WHERE sale_id = ? AND product_id = ?`,
        [product.quantity, saleId, product.productId],
      )),
  );
};

const deleteById = async (saleId) =>
  connection.execute('DELETE FROM sales WHERE id = ?', [saleId]);

module.exports = {
  createSale,
  insert,
  getAll,
  findById,
  updateById,
  deleteById,
};
