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

describe("POST /", () => {
  let createdUser;
  it("Successfully created account", async () => {
    const respCreate = await request.post("/users/").send(testUser);
    var data = getData(respCreate.body);
    createdUser = data;
    // check response
    expect(respCreate.statusCode).toBe(201);
    expect(data.id).toBeDefined();
    expect(data.username).toBe(testUser.username);
    expect(data.email).toBe(testUser.email);
    // check if in db
    const respGet = await request.get(`/users/${createdUser.id}`);
    data = getData(respGet.body);
    expect(data.id).toBe(createdUser.id);
    expect(data.username).toBe(createdUser.username);
    expect(data.email).toBe(createdUser.email);
  });

  it("User already exists returns error", async () => {
    const response = await request.post("/users/").send(testUser);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("User already exists");
  });

  it("Email already in use returns error", async () => {
    const newUser = {
      username: "newnew",
      password: "12345",
      email: testUser.email,
    };
    const response = await request.post("/users/").send(newUser);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Email already in use");
    await request.delete(`/users/${createdUser.id}`);
  });

  it("Missing field returns error", async () => {
    const response = await request.post("/users/").send({ username: "Jest" });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Username, Email or Password missing");
  });
});

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
