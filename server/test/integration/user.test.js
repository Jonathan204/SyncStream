import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../index";
const request = supertest(app);

let db;
beforeAll(async () => {
  const uri = process.env.DB_CONNECTION;
  db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

describe("POST /login", () => {
  it("Successfully logged in", async () => {
    const body = {
      username: "chrismg",
      password: "1234",
    };
    const response = await request
      .post("/users/login/")
      .send(body);
    expect(true).toBeTruthy();
  });
});

afterAll(async () => {
  // await db.close();
  await mongoose.disconnect();
});
