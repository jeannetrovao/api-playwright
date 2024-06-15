// @ts-check
const { test, expect } = require('@playwright/test');

// GET

test('Consultando as reservas cadastradas', async ({ request }) => {
  // Fazendo uma requisição GET para a API para obter os detalhes da reserva
  const response = await request.get('/booking');
  // Imprimindo os detalhes da reserva no console
  console.log(await response.json());
  // Verificando se a resposta da API foi bem-sucedida
  expect(response.ok()).toBeTruthy();
  // Verificando se o status da resposta é 200 (OK)
  expect(response.status()).toBe(200);
});

// GET

test('Consultando as reservas cadastradas com base em um id', async ({ request }) => {
  // o id abaixo pode não conter os dados abaixo já que é uma API pública de testes
  const response = await request.get('/booking/1');
  //transforma a resposta em json
  const jsonBody = await response.json();
  console.log(jsonBody);
  // Verificando se os dados da reserva estão corretos
  expect(jsonBody.firstname).toBe('Jeanne');
  expect(jsonBody.lastname).toBe('Trovao');
  expect(jsonBody.totalprice).toBe(222);
  expect(jsonBody.depositpaid).toBeTruthy();
  expect(jsonBody.bookingdates.checkin).toBe('2018-01-01');
  expect(jsonBody.bookingdates.checkout).toBe('2019-01-01');
  expect(jsonBody.additionalneeds).toBe('Breakfast');

  // Verificando se a resposta da API está OK
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});

// GET

test('Consultando as reservas cadastradas com base em um id validando apenas os campos', async ({ request }) => {
  const response = await request.get('/booking/1');
  const jsonBody = await response.json();
  console.log(jsonBody);
  // Verificando se os campos estão presentes na resposta da API
  expect(jsonBody).toHaveProperty('firstname');
  expect(jsonBody).toHaveProperty('lastname');
  expect(jsonBody).toHaveProperty('totalprice');
  expect(jsonBody).toHaveProperty('depositpaid');
  expect(jsonBody).toHaveProperty('bookingdates');

  // Verificando se a resposta da API está OK
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});