// @ts-check
const { test, expect } = require('@playwright/test');

var tokenRecebido

// DELETE (with POST for token)

test('Deletar uma reserva', async ({ request }) => {

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

  // Deletando a reserva:
  const deleteRequest = await request.delete('/booking/113', {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `token=${tokenRecebido}`
    }
  });

  //Resposta não tem JSON então peguei o texto
  const deletedResponseText = await deleteRequest.text();

  console.log(deletedResponseText);

  //Código de resposta DELETE é diferente
  expect(deleteRequest.status()).toBe(201);
  
  //Resposta do DELETE é diferente
  expect(deletedResponseText).toBe("Created");


  //Validando se a reserva não existe mais
  const validateDeletedRequest = await request.get('/booking/113');
  
  const validateDeletedRequestResponse = await validateDeletedRequest.text();
  console.log(validateDeletedRequestResponse);

  // O request deve retornar status 404 (Not Found)
  expect(validateDeletedRequest.status()).toBe(404);

});