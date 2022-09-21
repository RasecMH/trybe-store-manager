const productsList = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
  { id: 3, name: "Escudo do Capitão América" },
];

const productToUpdate = { id: 2, name: 'Lançador de teia' };

const productToInsert = { id: 4, name: 'Batcaverna' };

const errorValidationList = {
  minCharacters: {
    message: '"name" length must be at least 5 characters long'
  },
  fieldRequired: {
    message: '"name" is required',
  },
  productNotFound: {
    type: 'ITEM_NOT_FOUND', message: 'Product not found'
  },
  saleNotFound: {
    type: 'ITEM_NOT_FOUND', message: 'Sale not found'
  }

}

module.exports = {
  productsList,
  productToUpdate,
  errorValidationList,
  productToInsert
};