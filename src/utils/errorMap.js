const errorList = {};

const mapError = (type) => errorList[type] || 500;

module.exports = {
  errorList,
  mapError,
};
