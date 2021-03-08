import supertest from "supertest";
import app from "../../index";
const request = supertest(app);
const testUser = {
  username: "Jest",
  password: "1234",
  email: "jest@yo.com",
};
const getData = (body) => {
  return body.data ? body.data : body;
};

describe("POST /login", () => {
  let mockUser;
  beforeAll(async () => {
    const resp = await request.post("/users/").send(testUser);
    mockUser = resp.body.data;
  });

  it("Successfully logged in", async () => {
    const response = await request.post("/users/login/").send(testUser);
    const data = getData(response.body);
    expect(response.statusCode).toBe(201);
    expect(data.id).toBeDefined();
    expect(data.username).toBe(testUser.username);
    expect(data.email).toBe(testUser.email);
  });

  it("Missing field returns error", async () => {
    const response = await request
      .post("/users/login/")
      .send({ username: "Jest" });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Username or Password missing");
  });

  it("Incorrect password returns error", async () => {
    const response = await request
      .post("/users/login/")
      .send({ username: "Jest", password: "incorrect" });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Username or Password is incorrect");
  });

  it("Not existing user returns error", async () => {
    const response = await request
      .post("/users/login/")
      .send({ username: "Fake", password: "superFake" });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Username or Password is incorrect");
  });

  afterAll(async () => {
    await request.delete(`/users/${mockUser.id}`);
  });
});
