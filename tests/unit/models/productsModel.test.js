const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../../src/models/connection");
const productsModel = require("../../../src/models/products.model");

const {productsList, productToUpdate} = require('../../mocks/products.mock');


describe('Testa a camada de model da rota products', function () {
  afterEach(async function () {
      connection.execute.restore();
    });
  
  it('testa se a função getAll retorna todos os produtos no banco de dados', async function () {
    sinon.stub(connection, 'execute').resolves([productsList]);
    const result = await productsModel.getAll();
    expect(result).to.be.deep.equal(productsList);
  });

  it('testa se a função findById retorna o produto esperado', async function () {
    sinon.stub(connection, "execute").resolves([productsList[1]]);
    const result = await productsModel.findById(1);
    expect(result).to.be.deep.equal(productsList[1]);
  });

  it('testa se a função findByName retorna todos os valores se vazia', async function () {
    sinon.stub(connection, "execute").resolves([productsList]);
    const result = await productsModel.findByName();
    expect(result).to.equal(productsList);
  });

  it('testa se a função findByName retorna apenas o valor passado', async function () {
    sinon.stub(connection, "execute").resolves([productsList[0]]);
    const result = await productsModel.findByName(productsList[0].name);
    expect(result).to.equal(productsList[0]);
  });

  it('testa se a função insert cadastra um novo produto', async function () {
    sinon.stub(connection, "execute").resolves([{insertId: 1}]);
    const result = await productsModel.insert(productsList[1].name);
    expect(result).to.equal(1);
  });

  it('testa se a função updateById atualiza um produto', async function () {
    sinon.stub(connection, "execute").returns([{ affectedRows: 1 }]);
    const result = await productsModel.updateById(productToUpdate.id, productToUpdate.name);
    expect(result).to.deep.equal(productToUpdate);
  });

  it('testa se a função deleteById deleta um produto', async function () {
    sinon.stub(connection, "execute").returns([{ affectedRows: 1 }]);
    const result = await productsModel.deleteById(1);
    expect(result).to.deep.equal([{ affectedRows: 1 }]);
  });
})