import mongoose from "mongoose";
import UserSchema from "../../models/userSchema";
const newUser = {
  username: "Jest",
  password: "Yo",
  email: "jest@yo.com",
};
describe("User Schema Test", () => {
  let db;
  beforeAll(async () => {
    const uri = process.env.DB_CONNECTION;
    db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  });

  afterAll(async () => {
    await db.close();
    await mongoose.disconnect();
  });

  it("Create and save user", async () => {
    const validUser = new UserSchema(newUser);
    const savedUser = await validUser.save();
    expect(savedUser._id).toBeDefined();
    expect(savedUser.username).toBe(newUser.username);
    expect(savedUser.email).toBe(newUser.email);
    expect(savedUser.password).toBe(newUser.password);
    expect(savedUser.spotifyUserId).toBeUndefined();
    await UserSchema.findByIdAndRemove(savedUser._id);
  });
});
