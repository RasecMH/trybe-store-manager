const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../src/models/products.model');
const productsService = require('../../../src/services/products.service');

const {
  productsList,
  productToUpdate,
  errorValidationList,
  productToInsert,
} = require('../../mocks/products.mock');

describe('Testa a camada de services da rota products', function () {
  afterEach(async function () {
    sinon.restore();
  });

  it('testa se a função listProducts retorna todos os produtos', async function () {
    sinon.stub(productsModel, 'getAll').resolves(productsList);
    const result = await productsService.listProducts();
    expect(result).to.be.deep.equal({ type: null, message: productsList });
  });

  it('testa se a função listProductById retorna o produto escolhido', async function () {
    sinon.stub(productsModel, 'findById').resolves([productsList[0]]);
    const result = await productsService.listProductById(1);
    expect(result).to.be.deep.equal({ type: null, message: productsList[0] });
  });

  it('testa se a função listProductById retorna um erro ao não encontrar um produto', async function () {
    sinon.stub(productsModel, 'findById').resolves([]);
    const result = await productsService.listProductById(1);
    expect(result).to.be.deep.equal(errorValidationList.productNotFound);
  });

  it('testa se a função insert retorna o produto inserido', async function () {
    sinon.stub(productsModel, 'insert').resolves(productToInsert.id);
    const result = await productsService.createProduct(productToInsert.name);
    expect(result).to.be.deep.equal({ type: null, message: productToInsert });
  });

  it('testa se a função updateProductById atualiza um produto', async function () {
    sinon.stub(productsModel, 'updateById').resolves(productToUpdate);
    const result = await productsService.updateProductById(
      productToUpdate.id,
      productToUpdate.name
    );
    expect(result).to.be.deep.equal({ type: null, message: productToUpdate });
  });

  it('testa se a função updateProductById retorna um erro se o id não existir', async function () {
    sinon.stub(productsModel, 'findById').resolves([]);
    const result = await productsService.updateProductById(
      productToUpdate.id,
      productToUpdate.name
    );
    expect(result).to.be.deep.equal(errorValidationList.productNotFound);
  });

  it('testa se a função deleteProductById dele um produto', async function () {
    sinon.stub(productsModel, 'deleteById').resolves({ affectedRows: 1 });
    const result = await productsService.deleteProductById(1);
    expect(result).to.be.deep.equal({ type: null, message: result.message });
  });

  it('testa se a função deleteProductById retorna um erro se o id não existir', async function () {
    sinon.stub(productsModel, 'findById').resolves([]);
    const result = await productsService.deleteProductById(1);
    expect(result).to.be.deep.equal(errorValidationList.productNotFound);
  });

  it('testa se a função listProductsBySearchTerm retorna o produto pesquisado', async function () {
    sinon.stub(productsModel, 'findByName').resolves(productsList);
    const result = await productsService.listProductsBySearchTerm('');
    expect(result).to.be.deep.equal(productsList);
  });
});
