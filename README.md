# The Word Project

A aplicação se trata de um website de blog que provê ao usuário autênticado o serviço de criação, leitura, atualização e remoção (CRUD) de posts, assim como busca-los por termo ou autor.

O projeto teve como objetivo consolidar conhecimentos sobre Node.js, Express, Sequelize, sendo estruturada sob os princípios REST e arquitetura MSC (Model, Service, Controller).

Inicialmente o projeto se iniciou a partir de uma API de blogs feita por mim como tarefa de aprendizado do curso da [Trybe](https://www.betrybe.com/). Após finalizada, comecei a desenvolver o front-end em pararelo a implementações e reajustes feitos na API conforme a necessidade.


⚠️ MySQL deve estar instalado para o funcionamento da API.

⚠️ Usa localStorage do browser para autenticação de usuário.

<details>
<summary><strong>Quick start</strong></summary>

1. Clone o repositório e mude para a pasta back-end e instale as depedências:

```bash
git clone git@github.com:pennaor/the-word.git
cd ./the-word/back-end
npm install
```

2. Crie um arquivo .env com as variáveis da ambiente exemplificadas no arquivo `.env.example` presente na raíz do diretório `/back-end`.

3. Execute `npm run prestart` para criar o banco de dados e tabelas.

4. Execute `npx sequelize-cli db:seed:all` para popular o banco de dados.

5. Inicie a API com `npm start`.

6. Mude para o diretório do front-end e instale as depedências:

```bash
cd ../front-end
npm install
```

7. Crie um arquivo .env com as variáveis da ambiente exemplificadas no arquivo `.env.example` presente na raíz do diretório `/front-end`.

8. Inicie o front-end com `npm start`.

</details>

<details>
<summary><strong>Features</strong></summary>

- Buscar, cadastrar, autenticar e autorizar usuários.
- Buscar, cadastrar, atualizar e remover posts.
 
</details>

<details>
<summary><strong>Tools</strong></summary>
  
- Front-end:
  - [ReactJS](https://reactjs.org/)
  - [Redux](https://redux.js.org/)
  - [React Router](https://reactrouter.com/en/main)
  - [Axios](https://axios-http.com/docs/intro)
  - [Material-UI](https://mui.com/)
- Back-end:
  - [NodeJS](https://nodejs.org/en/)
  - [ExpressJS](https://expressjs.com/pt-br/)
  - [Sequelize](https://sequelize.org/)
  - [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)
  - [jose](https://github.com/panva/jose)
  - [Joi](https://joi.dev/)
- Linters:
  - [Eslint](https://eslint.org/)
  - [Stylelint](https://stylelint.io/)

</details>

<details>
<summary><strong>Trybe</strong></summary>

  - São de total autoria da [Trybe](https://www.betrybe.com/):
  	 - Proposta da API
  	 - Regras de Lint
	 - npm scripts

</details>
