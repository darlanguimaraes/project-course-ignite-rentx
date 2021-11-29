import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();
    await connection.query(
      `insert into users (id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}','admin', 'admin@admin.com','111111', true, 'now()', 'xxxx' )`
    );
    await connection.close();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com",
      password: "111111",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category supertest",
        description: "Category supertest",
      })
      .set({
        Authorization: `Baerer ${token}`,
      });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a new category if name already exists", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com",
      password: "111111",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category supertest",
        description: "Category supertest",
      })
      .set({
        Authorization: `Baerer ${token}`,
      });

    expect(response.status).toBe(400);
  });
});
