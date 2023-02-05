const verifyQuantity = (data) => {
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].quantity < 1) return true;
  }
  return false;
};

const verifyProducIdField = (data) => {
  for (let i = 0; i < data.length; i += 1) {
    if (!data[i].productId) return true;
  }
  return false;
};

const verifyQuantityField = (data) => {
  for (let i = 0; i < data.length; i += 1) {
    if (!data[i].quantity) return true;
  }
  return false;
};

module.exports = (req, res, next) => {
  const reqData = req.body;

  if (verifyQuantity(reqData)) {
      return res
      .status(422)
      .json({ message: '"quantity" must be greater than or equal to 1' });
    }

    if (verifyProducIdField(reqData)) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    
    if (verifyQuantityField(reqData)) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
    
  return next();
};
