import validate from "../validation";

describe("Test login input validation", () => {
  let mockLogin;

  beforeEach(() => {
    mockLogin = {
      username: "",
      password: "",
    };
  });

  it("should not allow empty login inputs", () => {
    const formErrors = validate(mockLogin);
    expect(Object.keys(formErrors).length).toBe(2);
    expect(formErrors.username).toBe("Username cannot be blank");
    expect(formErrors.password).toBe("Password cannot be blank");
  });

  it("should not allow username of less than 3 characters", () => {
    mockLogin.username = "yo";
    const formErrors = validate(mockLogin);
    expect(formErrors.username).toBe(
      "Please enter a username longer than 3 characters"
    );
  });

  it("should not allow username of more than 16 characters", () => {
    mockLogin.username = "yoooooooooooooooo"; //17 characters
    const formErrors = validate(mockLogin);
    expect(formErrors.username).toBe(
      "Please enter a username that's 16 characters or shorter"
    );
  });

  it("should not allow username of more than a lot of characters", () => {
    mockLogin.username =
      "yooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo";
    const formErrors = validate(mockLogin);
    expect(formErrors.username).toBe(
      "Please enter a username that's 16 characters or shorter"
    );
  });

  it("should not fail with the minimum number of characters", () => {
    mockLogin.username = "yoo";
    mockLogin.password = "sdfsdfsdf";
    const formErrors = validate(mockLogin);
    expect(Object.keys(formErrors).length).toBe(0);
  });

  it("should not fail with the maximum number of characters", () => {
    mockLogin.username = "yooooooooooooooo"; //20 characters
    mockLogin.password = "sdfsdfsdf";
    const formErrors = validate(mockLogin);
    console.log(formErrors);
    expect(Object.keys(formErrors).length).toBe(0);
  });

  it("should not count as 3 characters", () => {
    mockLogin.username = "y     o";
    const formErrors = validate(mockLogin);
    expect(formErrors.username).toBe("Please enter a valid username");
  });

  it("should only allow usernames with valid characters", () => {
    mockLogin.username = "%$#@;;";
    let formErrors = validate(mockLogin);
    expect(formErrors.username).toBe("Please enter a valid username");

    mockLogin.username = "valid;;;^valid";
    formErrors = validate(mockLogin);
    expect(formErrors.username).toBe("Please enter a valid username");

    mockLogin.username = "%@&valid";
    formErrors = validate(mockLogin);
    expect(formErrors.username).toBe("Please enter a valid username");

    mockLogin.username = "valid;;:^%";
    formErrors = validate(mockLogin);
    expect(formErrors.username).toBe("Please enter a valid username");
  });

  it("should not contain any errors", () => {
    mockLogin.username = "mjbathtub";
    mockLogin.password = "securepassword";
    const formErrors = validate(mockLogin);
    expect(Object.keys(formErrors).length).toBe(0);
  });
});

describe("Test register input validation", () => {
  let mockRegister;

  beforeEach(() => {
    mockRegister = {
      username: "valid",
      email: "",
      password: "valid",
      confirmPassword: "",
    };
  });

  it("should not allow blank fields", () => {
    mockRegister.username = "";
    mockRegister.password = "";
    const formErrors = validate(mockRegister);
    expect(Object.keys(formErrors).length).toBe(4);
    expect(formErrors.username).toBe("Username cannot be blank");
    expect(formErrors.password).toBe("Password cannot be blank");
    expect(formErrors.email).toBe("Email cannot be blank");
    expect(formErrors.confirmPassword).toBe("Please confirm password");
  });

  it("should allow long emails", () => {
    mockRegister.email =
      "gggggggggg@gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg.com";
    mockRegister.username = "dfdfd";
    mockRegister.password = "ggg";
    mockRegister.confirmPassword = "ggg";
    let formErrors = validate(mockRegister);
    expect(Object.keys(formErrors).length).toBe(0);
  });

  it("should allow minimum length emails", () => {
    mockRegister.email = "g@g.com";
    mockRegister.username = "dfdfd";
    mockRegister.password = "ggg";
    mockRegister.confirmPassword = "ggg";
    let formErrors = validate(mockRegister);
    expect(Object.keys(formErrors).length).toBe(0);
  });

  it("should only accept valid emails", () => {
    mockRegister.email = "@!$@%$^%^&%^$&";
    let formErrors = validate(mockRegister);
    expect(formErrors.email).toBe("Please enter a valid email");

    mockRegister.email = "yo^&@^$yo.com";
    formErrors = validate(mockRegister);
    expect(formErrors.email).toBe("Please enter a valid email");

    mockRegister.email = "yo@*&^yo.com";
    formErrors = validate(mockRegister);
    expect(formErrors.email).toBe("Please enter a valid email");

    mockRegister.email = "yoyo.com";
    formErrors = validate(mockRegister);
    expect(formErrors.email).toBe("Please enter a valid email");

    mockRegister.email = "yo@yo";
    formErrors = validate(mockRegister);
    expect(formErrors.email).toBe("Please enter a valid email");
  });

  it("should only accept matching passwords", () => {
    let formErrors = validate(mockRegister);
    expect(formErrors.confirmPassword).toBe("Please confirm password");

    formErrors.confirmPassword = "notthesame";
    formErrors = validate(mockRegister);
    expect(formErrors.confirmPassword).toBe("Please confirm password");

    formErrors.confirmPassword = "valid   ";
    formErrors = validate(mockRegister);
    expect(formErrors.confirmPassword).toBe("Please confirm password");

    formErrors.confirmPassword = "    valid";
    formErrors = validate(mockRegister);
    expect(formErrors.confirmPassword).toBe("Please confirm password");
  });

  it("should not contain any errors", () => {
    mockRegister.email = "yo@yo.com";
    mockRegister.confirmPassword = "valid";
    const formErrors = validate(mockRegister);
    expect(Object.keys(formErrors).length).toBe(0);
  });
});
