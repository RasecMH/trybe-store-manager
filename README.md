Este projeto foi desenvolvido durante o curso de Desenvolvimento Web Full Stack da Trybe com o objetivo de reforçar meus aprendizados de Javascript, Docker, NodeJs, Express, MySQL, Querys SQL, Teste Unitarios, Mocha e Arquitetura MSC.

A aplicação se trata de uma API para o gerenciamento de uma loja, onde é possível consultar e cadastrar produtos e vendas.

Para rodar o projeto:

  ```
  git clone git@github.com:RasecMH/trybe-store-manager.git
  ```

  ```
  cd trybe-store-manager
  ```
  
  * Localmente (Necessário <a href="https://nodejs.org/en/" target="_blank">Node</a> e <a href="https://www.mysql.com" target="_blank">MySQL</a> instalados na máquina):
    ```
    npm install
    ```

    ```
    npm run migration
    ```

    ```
    npm run seed
    ```

    ```
    npm start
    ```
  
  * Para rodar os testes:
    ```
    npm run test
    ```

  * Docker (APP_PORT: 3000 | MYSQL_PORT: 3306):
    ```
    docker-compose up -d --build
    ```

    ```
    docker exec -it store_manager bash
    ```

    ```
    npm install
    ```

    ```
    npm run migration
    ```

    ```
    npm run seed
    ```

    ```
    npm start
    ```

  * Para rodar os testes:
    ```
    npm run test
    ```

## Rotas

### /products

<details>
  <summary>GET</summary>
  
* Em caso de sucesso retorna com status `200` um array vazio ou:
  ```json
    [
      {
        "id": 1,
        "name": "Martelo de Thor"
      },
      {
        "id": 2,
        "name": "Traje de encolhimento"
      }
      /* ... */
    ]
  ```

</details>

<details>
  <summary>POST</summary>
  
* Corpo da requisição
  ```json
    {
      "name": "ProdutoX"
    }
  ```

* Em caso de sucesso retorna com status `201`:
  ```json
    {
      "id": 4,
      "name": "ProdutoX"
    }
  ```  

* Caso o campo name não exista na requisição ou esteja vazio retorna com status ``400``:
  ```json
    { "message": "\"name\" is required" }
  ```

* Caso o o valor no campo name possua menos de 5 caracteres retorna com status ``400``:
  ```json
    { "message": "\"name\" length must be at least 5 characters long" }
  ```

</details>

### /products/:id

<details>
  <summary>GET</summary>
  
* Em caso de sucesso retorna com status `200`:
  ```json
    {
      "id": 1,
      "name": "Martelo de Thor"
    }
  ```

* Caso o produto não seja encontrado no banco de dados retorna com status ``404``:
  ```json
    { "message": "Product not found" }
  ```

</details>

<details>
  <summary>PUT</summary>

* Corpo da requisição
  ```json
    {
      "name": "Martelo do Batman"
    }
  ```
  
* Em caso de sucesso retorna com status `200`:
  ```json
    {
      "id": 1,
      "name": "Martelo do Batman"
    }
  ```

* Caso o produto não seja encontrado no banco de dados retorna com status ``404``:
  ```json
    { "message": "Product not found" }
  ```

</details>

<details>
  <summary>DELETE</summary>

* Em caso de sucesso retorna status `204`.

* Caso o produto não seja encontrado no banco de dados retorna com status ``404``:
  ```json
    { "message": "Product not found" }
  ```

</details>

### /products/search

<details>
  <summary>GET</summary>
  Pesquisa filtra pelo campo name, caso nada seja passado, retorna um array com todos os produtos.

* Em caso de sucesso retorna com status `200`:
  ```json
    // GET /products/search?q=Martelo
    [
      {
        "id": 1,
        "name": "Martelo de Thor"
      }
    ]
  ```

  ```json
    // GET /products/search?q=
    [
      {
        "id": 1,
        "name": "Martelo de Thor",
      },
      {
        "id": 2,
        "name": "Traje de encolhimento",
      }
      /* ... */
    ]
    ```

</details>

### /sales

<details>
<summary>GET</summary>

* Em caso de sucesso retorna com status ``200`` um array vazio ou:
  ```json
    [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }

      /* ... */
    ]
  ```

</details>

<details>
<summary>POST</summary>

* Corpo da requisição
  ```json
    [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]
  ```

* Em caso de sucesso retorna com status ``201``:
  ```json
    {
      "id": 3,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
        ]
    } 
  ```

* Caso o campo productId não exista ou esteja vazio retorna com status ``400``:
  ```json
    { "message": "\"productId\" is required" }
  ```

* Caso o campo quantity não exista ou esteja vazio retorna com status ``400``:
  ```json
    { "message": "\"quantity\" is required" }
  ```

* Caso o valor no campo quantity seja menor ou igual a 0 retorna com status ``422``:
  ```json
    { "message": "\"quantity\" must be greater than or equal to 1" }
  ```

* Caso algum productId não exista no banco de dados retorna com status ``404``:
  ```json
    { "message": "Product not found" }
  ```

</details>

### /sales/:id

<details>
<summary>GET</summary>

* Em caso de sucesso retorna com status ``200``:
  ```json
    [
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      }

      /* ... */
    ]
  ```

* Caso a venda não exista no banco de dados retorna com status ``404``:
  ```json
    { "message": "Sale not found" }
  ```

</details>

<details>
<summary>PUT</summary>

* Corpo da requisição
  ```json
    [
      {
        "productId": 1,
        "quantity": 10
      },
      {
        "productId": 2,
        "quantity": 50
      }
    ]
  ```

* Em caso de sucesso retorna com status ``200``:
  ```json
    "saleId": 1,
      "itemsUpdated": [
        {
          "productId": 1,
          "quantity":10
        },
        {
          "productId": 2,
          "quantity":50
        }
      ]
  ```

* Caso a venda não exista no banco de dados retorna com status ``404``:
  ```json
    { "message": "Sale not found" }
  ```

</details>

<details>
<summary>DELETE</summary>

* Em caso de sucesso retorna status ``204``.

* Caso a venda não exista no banco de dados retorna com status ``404``:
  ```json
    { "message": "Sale not found" }
  ```

</details>
