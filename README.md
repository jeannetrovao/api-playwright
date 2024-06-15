# Automação de testes de API REST usando o framework Playwright

A partir de um bootcamp de API promovido pela Qazando, comecei a fazer os scripts de testes e acrescentei outros pra treinar o conhecimento e ter mais exemplos de como trabalhar com esse framework e a biblioteca de requests.

A API usada como referência é a https://restful-booker.herokuapp.com/ (API de reservas).

A URL já está fixada na variável `baseURL` dentro de `playwright.config.js`

**Obs:** por ser uma API pública, alguns testes podem falhar dependendo do id que é usado, sugiro fazer primeiro um request de cadastro e utilizar o id gerado para realizar os demais testes.

Separei os testes pelas principais funções de um CRUD como por exemplo: Buscar, Cadastrar, Atualizar e Deletar.

## Uso

Para utilizar, recomendo os seguintes passos:

- Instalar a extensão do Playwright Test for VS Code
- Abrir o terminal dentro do VS Code e fazer o git clone do repositório
- Dentro da pasta no terminal execute o seguinte comando:
  ```
  $npm init playwright@latest
  ```
  
  Isso irá inicializar um novo projeto Playwright com as configurações e dependências mais recentes.
  Vão ser feitas algumas perguntas e as mais importantes aqui são:
    - Qual a linguagem? Escolha `JavaScript`.
    - Qual o respositório dos testes? Escolha `tests`.

- Para rodar um teste específico basta clicar no botão de play que aparece ao lado do teste:
  <img width="609" alt="image" src="https://github.com/jeannetrovao/api-playwright/assets/5014385/1cba06e1-28a5-4775-b92d-025f42e1d362">

- Para rodar todos os testes via terminal:
  ```
  $npx playwright test
- Para rodar apenas um arquivo, coloque o nome dele (ou parte dele) após "test":
  ```
  $npx playwright test buscar
  ```
	Isso vai executar todos os testes dentro do arquivo `buscar-reservas.spec.js`

- Para gerar o arquivo de report em HTML:
  ```
  $npx playwright show-report
  ```
