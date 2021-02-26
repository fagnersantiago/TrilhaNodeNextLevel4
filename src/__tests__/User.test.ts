import request from 'supertest';
import {getConnection} from 'typeorm'
import app from "../app";

import createConnection from "../database";

describe("Users", () => {
  //Antes de criar o test é preciso criar migrations para o banco test

  beforeAll(async () => {
    //criando conexão com o banco de test
    const connection = await createConnection();
    //cria e retorn um migartion
    await connection.runMigrations();
  });

  afterAll(async()=>{
    const connection = getConnection();
    await getConnection().dropDatabase();
    await connection.close()
  })

  //teste de criação de usuário
  it("Should be able to crate a new user", async () => {
    //cria um teste de requisição e resposta
    const response = await request(app).post("/user").send({
      email: "johndoe@exemple.com",
      name: "Jhon Doe",
    });
    //aguarda a resposta da requisição

    expect(response.status).toBe(200);
  });

  it("Should not be able to crate a user with exists email", async () => {
    //cria um teste de requisição e resposta
    const response = await request(app).post("/user").send({
      email: "johndoe@exemple.com",
      name: "Jhon Doe",
    });
    //aguarda a resposta da requisição

    expect(response.status).toBe(400);
  });
});
