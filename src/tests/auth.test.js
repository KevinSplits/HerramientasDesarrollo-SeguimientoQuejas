import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js"; // Ajusta la ruta a tu archivo principal de Express

describe("Registro de usuario", () => {
  it("debe rechazar registro con campos vacíos", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "", password: "" });
    expect(res.statusCode).toBe(400);
  });
});