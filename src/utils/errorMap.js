const errorList = {
  ITEM_NOT_FOUND: 404,
};

const mapError = (type) => errorList[type] || 500;

module.exports = {
  errorList,
  mapError,
};
