const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers/products.controller');

const {
  productsList,
  productToUpdate,
  errorValidationList,
  productToInsert,
} = require('../../mocks/products.mock');

describe('Testa a camada de controller da rota products', function () {
  afterEach(async function () {
    sinon.restore();
    req = {};
    res = {};
  });

  let req = {};
  let res = {};

  it('testa se a função listProducts retorna todos os produtos', async function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'listProducts')
      .resolves({ type: null, message: productsList });
    await productsController.listProducts(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(productsList)).to.be.true;
  });

  it('testa se a função listProductById retorna o produto pedido', async function () {
    req.params = { id: productsList[0].id };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'listProductById')
      .resolves({ type: null, message: productsList[0] });
    await productsController.listProductById(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(productsList[0])).to.be.true;
  });

  it('testa se a função listProductById retorna 404 se o produto não existir', async function () {
    req.params = { id: 0 };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'listProductById')
      .resolves({type: 'ITEM_NOT_FOUND', message: 'Product not found'});
    await productsController.listProductById(req, res);
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({message: errorValidationList.productNotFound.message})).to.be.true;
  });

  it('testa se a função createProduct cadastra um novo produto', async function () {
    req.body = { name: productToInsert.name };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'createProduct')
      .resolves({ type: null, message: productToInsert });
    await productsController.createProduct(req, res);
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(productToInsert)).to.be.true;
  });

  it('testa se a função updateProductById atualiza um produto', async function () {
    req.body = { name: productToUpdate.name };
    req.params = {id: productToUpdate.id}
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'updateProductById')
      .resolves({ type: null, message: productToUpdate });
    await productsController.updateProductById(req, res);
    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(productToUpdate)).to.be.true;
  });
});
