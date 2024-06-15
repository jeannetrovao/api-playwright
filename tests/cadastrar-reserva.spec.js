// @ts-check
const { test, expect } = require('@playwright/test');

// POST

test('Cadastrando uma reserva', async ({ request }) => {
  const response = await request.post('/booking', {
    data: {
      "firstname": "Jeanne",
      "lastname": "Trovao",
      "totalprice": 111,
      "depositpaid": true,
      "bookingdates": {
        "checkin": "2018-01-01",
        "checkout": "2019-01-01"
      },
      "additionalneeds": "Breakfast"
    }
  });
  console.log(await response.json());

  // Verificando se a resposta da API está OK
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  // validando dados de retorno
  const responseBody = await response.json()
  expect(responseBody.booking).toHaveProperty("firstname", "Jeanne");
  expect(responseBody.booking).toHaveProperty("lastname", "Trovao");
  expect(responseBody.booking).toHaveProperty("totalprice", 111);
  expect(responseBody.booking).toHaveProperty("depositpaid", true);
});