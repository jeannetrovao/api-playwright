// @ts-check
const { test, expect } = require('@playwright/test');

var tokenRecebido

// POST

//testando como criar um token usando tag no teste
test('Gerando um token @regressivo', async ({ request }) => {

  const response = await request.post('/auth', {
    data: {
      "username": "admin",
      "password": "password123"
    }
  });

  console.log(await response.json());
  // Verificando se a resposta da API está OK
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  tokenRecebido = responseBody.token;
  console.log("Seu token é:" + tokenRecebido);

});

// PATCH (with POST for token)

test('Atualização parcial', async ({ request }) => {

  // criando o token
  const response = await request.post('/auth', {
    data: {
      "username": "admin",
      "password": "password123"
    }
  });

  console.log(await response.json());
  // Verificando se a resposta da API está OK
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  tokenRecebido = responseBody.token;
  console.log("Seu token é:" + tokenRecebido);

  // Atualizando dados da reserva:
  // OBS: Se for atualizado recente com mesmo id dá erro
  const partialUpdateRequest = await request.patch('/booking/2', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cookie': `token=${tokenRecebido}`
    },
    data: {
      "firstname": "Jeanne",
      "lastname": "Trovao",
      "totalprice": 222,
      "depositpaid": false
    }
  });
  console.log(await partialUpdateRequest.json());
  expect(partialUpdateRequest.ok()).toBeTruthy();
  expect(partialUpdateRequest.status()).toBe(200);

  const partialUpdatedResponseBody = await partialUpdateRequest.json()

  expect(partialUpdatedResponseBody).toHaveProperty("firstname", "Jeanne");
  expect(partialUpdatedResponseBody).toHaveProperty("lastname", "Trovao");
  expect(partialUpdatedResponseBody).toHaveProperty("totalprice", 222);
  expect(partialUpdatedResponseBody).toHaveProperty("depositpaid", false);

});

// PUT (with POST for token)

test('Atualização total', async ({ request }) => {

  // criando o token
  const response = await request.post('/auth', {
    data: {
      "username": "admin",
      "password": "password123"
    }
  });

  console.log(await response.json());
  // Verificando se a resposta da API está OK
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  tokenRecebido = responseBody.token;
  console.log("Seu token é:" + tokenRecebido);

  // Atualizando todos os dados da reserva:
  const totalUpdateRequest = await request.put('/booking/2', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Cookie': `token=${tokenRecebido}`
    },
    data: {
      "firstname": "Jeanne",
      "lastname": "Trovao",
      "totalprice": 222,
      "depositpaid": false,
      "bookingdates": {
        "checkin": "2018-01-01",
        "checkout": "2019-01-01"
      },
      "additionalneeds": "Breakfast"
    }
  });
  console.log(await totalUpdateRequest.json());
  expect(totalUpdateRequest.ok()).toBeTruthy();
  expect(totalUpdateRequest.status()).toBe(200);

  const totalUpdatedResponseBody = await totalUpdateRequest.json()

  expect(totalUpdatedResponseBody).toHaveProperty("firstname", "Jeanne");
  expect(totalUpdatedResponseBody).toHaveProperty("lastname", "Trovao");
  expect(totalUpdatedResponseBody).toHaveProperty("totalprice", 222);
  expect(totalUpdatedResponseBody).toHaveProperty("depositpaid", false);
  expect(totalUpdatedResponseBody).toHaveProperty("bookingdates");
  expect(totalUpdatedResponseBody.bookingdates).toHaveProperty("checkin", "2018-01-01");
  expect(totalUpdatedResponseBody.bookingdates).toHaveProperty("checkout", "2019-01-01");
  expect(totalUpdatedResponseBody).toHaveProperty("additionalneeds", "Breakfast");

});