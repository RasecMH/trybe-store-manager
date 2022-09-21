const connection = require('./connection');

const insert = async (productName) => {
  const [result] = await connection.execute(
    'INSERT INTO products(name) VALUE(?)',
    [productName],
  );
  return result.insertId;
};

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  console.log(result);
  return result;
};

const findById = async (productId) => {
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return result;
};

const findByName = async (productName) => {
  const [result] = await connection.execute(
    'SELECT * FROM products WHERE products.name LIKE ?',
    [`%${productName}%`],
  );
  return result;
};

const updateById = async (productId, name) => {
  await connection.execute('UPDATE products SET name = ? WHERE id = ?', [
    name,
    productId,
  ]);
  return { id: productId, name };
};

const deleteById = async (productId) => connection.execute(
  'DELETE FROM products WHERE id = ?', [productId],
);

module.exports = {
  insert,
  getAll,
  findById,
  findByName,
  updateById,
  deleteById,
};
