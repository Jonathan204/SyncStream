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
    expect(response.body.message).toBeDefined();
  });

  it("Email already in use returns error", async () => {
    const newUser = {
      username: "newnew",
      password: "12345",
      email: testUser.email,
    };
    const response = await request.post("/users/").send(newUser);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeDefined();
    await request.delete(`/users/${createdUser.id}`);
  });

  it("Missing field returns error", async () => {
    const response = await request.post("/users/").send({ username: "Jest" });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBeDefined();
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
    expect(response.body.message).toBeDefined();
  });

  it("Incorrect password returns error", async () => {
    const response = await request
      .post("/users/login/")
      .send({ username: "Jest", password: "incorrect" });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBeDefined();
  });

  it("Not existing user returns error", async () => {
    const response = await request
      .post("/users/login/")
      .send({ username: "Fake", password: "superFake" });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBeDefined();
  });

  afterAll(async () => {
    await request.delete(`/users/${mockUser.id}`);
  });
});

describe("GET /", () => {
  let mockUser;
  beforeAll(async () => {
    const resp = await request.post("/users/").send(testUser);
    mockUser = resp.body.data;
  });

  it("Returns at least the created user inside a list", async () => {
    const resp = await request.get("/users/");
    const data = getData(resp.body);
    const expected = {
      username: testUser.username,
    };
    expect(data).toEqual(expect.arrayContaining([expected]));
  });

  afterAll(async () => {
    await request.delete(`/users/${mockUser.id}`);
  });
});

describe("PATCH /:id", () => {
  const toUpdate = {
    spotifyUserId: "ilovemusic",
  };
  let mockUser;
  beforeAll(async () => {
    const resp = await request.post("/users/").send(testUser);
    mockUser = getData(resp.body);
  });

  it("Successfully updates user", async () => {
    const resp = await request.patch(`/users/${mockUser.id}`).send(toUpdate);
    expect(resp.statusCode).toBe(200);
    // check user in db
    const respGet = await request.get(`/users/${mockUser.id}`);
    const data = getData(respGet.body);
    expect(data.id).toBe(mockUser.id);
    expect(data.username).toBe(mockUser.username);
    expect(data.email).toBe(mockUser.email);
    expect(data.spotifyUserId).toBe(toUpdate.spotifyUserId);
  });

  it("Wrond id returns error", async () => {
    const resp = await request.patch("/users/123456").send(toUpdate);
    expect(resp.statusCode).toBe(404);
    expect(resp.body.message).toBeDefined();
  });

  afterAll(async () => {
    await request.delete(`/users/${mockUser.id}`);
  });
});
