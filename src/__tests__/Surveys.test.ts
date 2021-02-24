import request from "supertest";
import app from "../app";

import createConnection from "../database";

describe("Surveys", () => {
  //Antes de criar o test é preciso criar migrations para o banco test

  beforeAll(async () => {
    //criando conexão com o banco de test
    const connection = await createConnection();
    //cria e retorn um migartion
    await connection.runMigrations();
  });

  //teste de criação de usuário
  it("Should be able to crate a new surveys", async () => {
    //cria um teste de requisição e resposta
    const response = await request(app).post("/surveys").send({
      title: "test exemplo",
      description: "description ",
    });
    //aguarda a resposta da requisição

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });
});
