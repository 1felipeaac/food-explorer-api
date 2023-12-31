# Sobre o Projeto
Este projeto é backend o Desafil Final da trilha Explorer da 🚀[Rocketseat](https://www.rocketseat.com.br/)

👨🏽‍💻 Author: Felipe Augusto de Araujo Coelho


Deploy: https://food-explorer-api-nx1z.onrender.com

Server (NodeJs + javascript)

Tecnologias:

    ✔️ bcryptjs
    ✔️ cookie
    ✔️ cookie-parser
    ✔️ cors
    ✔️ dotenv
    ✔️ express
    ✔️ express-async-errors
    ✔️ jsonwebtoken
    ✔️ knex
    ✔️ multer
    ✔️ pm2
    ✔️ sqlite
    ✔️ sqlite3

# Estrutura do Projeto

- ## Configs:

    - auth;
    - upload

- ## Controllers:

    - DishesController.js;
    - ImageController.js;
    - OrdersController.js;
    - SessionsController.js;
    - UsersController.js;
    - UsersValidatedController.js

- ## Database:
    
    - Knex;
    - sqlite
    

- ## Middlewares:
    
    - ensureAuthenticated.js;
    - verifyUserAuthorization.js
    

- ## Providers:
    
    - DiskStorage.js;
    
- ## Repositories:
    
    - DishesRepository.js;
    - OrdersRepository.js;
    - SessionsRepository.js;
    - UsersRepository.js;
    
- ## Routes:
    
    - dishes.routes.js
    - orders.routes.js
    - sessions.routes.js
    - users.routes.js
    

- ## Services:
    
    - DishesService.js
    - OrdersService.js
    - SessionService.js
    - UsersService.js
    - UsersValidatedService.js

- ## Utils:

    - AppError.js


<H1 id="funcionamento">📒 Funcionamento</H1>

<div style="text-align: justify">
O arquivo server.js, é o responsável por inicializar toda a aplicação. Através do Express é possível criar rotas, analisar o corpo das requisições, autorizar acessos cruzados, iniciar as migrations e informar se o serviço está rodando ou apresenta falhas.

As rotas direcionam para onde as requisições devem seguir, se é para usuários, pratos, pedidos ou sessão, se um determinado usuário tem ou não permissão para acessar determinados conteúdos. A partir delas é possível acessar os controladores, que tem as funções de criar, remover, editar e ler os arquivos do banco de dados. Os controladores acionam as funções de serviço, que possuem as regras de negócio das funcionalidades, incluindo as funções de acesso ao banco.

Pra o banco de dados foram utilizados migrations, que são uma forma de gerenciamento, registram versões e organizam o banco. Utilizamos o Knex como query builder e o sqlite como base de dados.

Foram criadas migrations para produzir as tabelas de usuários, pratos, pedidos e ingredientes.

A autenticação, para dar acesso ao serviço, se dá através do JWT. O token é extraído do cookie da aplicação, o que a torna menos vulnerável. Esta etapa é feita no middleware ensusreAuthenticated.

Outro middleware é o verifyUserAuthorization, que verifica a role do usuário e dá acesso ou não dependendo do perfil (a role por padrão é costumer, para mudar para admin é necessário acesso direto ao banco).

O server também utiliza o multer para gerenviar arquivos, e o DiskStorage se utiliza dessad configutrações para criar e remover as imagens recebidas pelo banco. Antes de armazenar no banco os arquivos são salvos numa pasta temporária 'temp' e quando comitadas vão para pasta upload.

O projeto possui uma collection do insomnia para fazer as requisições e testar a API






</div>

# ▶️ Como Executar

No seu Terminal

````javascript
git clone https://github.com/1felipeaac/food-explorer-api.git
````
Na pasta onde o projeto foi clonado
````javascript
npm install
````
````javascript
npm run dev
````