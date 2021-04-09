describe("Register Test", () => {
  //As a user, I want to create an account that stores my information.
  it("Registers an account", () => {
    cy.visit("localhost:3000");
    cy.intercept("POST", "/users").as("createUser");

    cy.contains("Don't have an account? Create one!").click();
    cy.get("form").find("[name=email]").type("George@google.com");
    cy.get("form").find("[name=username]").type("George");
    cy.get("form").find("[placeholder=Password]").type("SecurePassword");
    cy.get("form").find("[name=confirmPassword]").type("SecurePassword");
    cy.get("button").click();

    cy.wait("@createUser").then((response) => {
      const id = response.response.body.data.id;
      cy.request("DELETE", `/users/${id}`);
    });
  });
  //As a user, I want to login to my SyncStream account.
  it("Logins into account", () => {
    cy.visit("localhost:3000");
    cy.intercept("POST", "/users").as("createUser");

    cy.contains("Don't have an account? Create one!").click();
    cy.get("form").find("[name=email]").type("George@google.com");
    cy.get("form").find("[name=username]").type("George");
    cy.get("form").find("[placeholder=Password]").type("SecurePassword");
    cy.get("form").find("[name=confirmPassword]").type("SecurePassword");
    cy.get("button").click();

    cy.wait("@createUser").then((response) => {
      const id = response.response.body.data.id;
      cy.get("form").find("[name=username]").type("George");
      cy.get("form").find("[name=password]").type("SecurePassword");
      cy.get("button").click();
      cy.request("DELETE", `/users/${id}`);
    });
  });
  //As a user, I want to see myself on a map.
  it("Show user on map", () => {
    cy.visit("localhost:3000");
    cy.intercept("POST", "/users/login").as("loginUser");
    cy.intercept("PATCH", "/users").as("updateUser");
    cy.intercept("POST", "/users").as("createUser");
    cy.intercept("GET", "/users").as("getUsers");

    cy.contains("Don't have an account? Create one!").click();
    cy.get("form").find("[name=email]").type("George@google.com");
    cy.get("form").find("[name=username]").type("George");
    cy.get("form").find("[placeholder=Password]").type("SecurePassword");
    cy.get("form").find("[name=confirmPassword]").type("SecurePassword");
    cy.get("button").click();

    cy.wait("@createUser").then((response) => {
      const id = response.response.body.data.id;
      cy.get("form").find("[name=username]").type("George");
      cy.get("form").find("[name=password]").type("SecurePassword");
      cy.get("button").click();
      cy.wait("@loginUser").then((response) => {
        cy.on("window:alert", () => {
          cy.get("button").contains("Allow").click();
        });
        cy.wait("@getUsers").then(response, () => {
          cy.wait("@updateUser").then(response, () => {
            cy.wait(1000);
            cy.request("DELETE", `/users/${id}`);
          });
        });
      });
    });
  });
  //As a user, I want to link my Spotify account to my SyncStream account.
  it("Link spotify account", () => {
    cy.visit("localhost:3000");
    cy.intercept("POST", "/users/login").as("loginUser");
    cy.intercept("POST", "/users").as("createUser");
    cy.intercept("GET", "/users").as("getUsers");

    cy.contains("Don't have an account? Create one!").click();
    cy.get("form").find("[name=email]").type("George@google.com");
    cy.get("form").find("[name=username]").type("George");
    cy.get("form").find("[placeholder=Password]").type("SecurePassword");
    cy.get("form").find("[name=confirmPassword]").type("SecurePassword");
    cy.get("button").click();

    cy.wait("@createUser").then((response) => {
      const username = response.response.body.data.username;
      const id = response.response.body.data.id;
      cy.intercept("PATCH", `/users/${id}`).as("updateUser");
      cy.get("form").find("[name=username]").type("George");
      cy.get("form").find("[name=password]").type("SecurePassword");
      cy.get("button").click();
      cy.wait("@loginUser").then(() => {
        cy.on("window:alert", () => {
          cy.get("button").contains("Allow").click();
        });
        cy.wait("@getUsers").then(() => {
          cy.wait("@updateUser").then(() => {
            cy.wait(1000);
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[id=${username}]`).find("svg").click({ force: true });
            cy.get(".spotify-btn").contains("Login to Spotify");
            cy.request("DELETE", `/users/${id}`);
          });
        });
      });
    });
  });
  //As a user, I want to see where other users are on the map.
  it("Find other people in the map", () => {
    cy.visit("localhost:3000");
    cy.intercept("POST", "/users/login").as("loginUser");
    cy.intercept("POST", "/users").as("createUser");
    cy.intercept("GET", "/users").as("getUsers");

    cy.contains("Don't have an account? Create one!").click();
    cy.get("form").find("[name=email]").type("George@google.com");
    cy.get("form").find("[name=username]").type("George");
    cy.get("form").find("[placeholder=Password]").type("SecurePassword");
    cy.get("form").find("[name=confirmPassword]").type("SecurePassword");
    cy.get("button").click();

    cy.wait("@createUser").then((response) => {
      const id = response.response.body.data.id;
      cy.intercept("PATCH", `/users/${id}`).as("updateUser");
      cy.get("form").find("[name=username]").type("George");
      cy.get("form").find("[name=password]").type("SecurePassword");
      cy.get("button").click();
      cy.wait("@loginUser").then(() => {
        cy.on("window:alert", () => {
          cy.get("button").contains("Allow").click();
        });
        cy.wait("@getUsers").then(() => {
          cy.wait("@updateUser").then(() => {
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[id=test]`).find("svg").click({ force: true });
            cy.get(".info-window-style-map").contains(
              "This User isn't playing anything"
            );
            cy.request("DELETE", `/users/${id}`);
          });
        });
      });
    });
  });
  //As a user, I want to be able to see what other people are listening to.
  it("Find what other people are listening to", () => {
    cy.visit("localhost:3000");
    cy.intercept("POST", "/users/login").as("loginUser");
    cy.intercept("POST", "/users").as("createUser");
    cy.intercept("GET", "/users").as("getUsers");

    cy.contains("Don't have an account? Create one!").click();
    cy.get("form").find("[name=email]").type("George@google.com");
    cy.get("form").find("[name=username]").type("George");
    cy.get("form").find("[placeholder=Password]").type("SecurePassword");
    cy.get("form").find("[name=confirmPassword]").type("SecurePassword");
    cy.get("button").click();

    cy.wait("@createUser").then((response) => {
      const id = response.response.body.data.id;
      cy.intercept("PATCH", `/users/${id}`).as("updateUser");
      cy.get("form").find("[name=username]").type("George");
      cy.get("form").find("[name=password]").type("SecurePassword");
      cy.get("button").click();
      cy.wait("@loginUser").then(() => {
        cy.on("window:alert", () => {
          cy.get("button").contains("Allow").click();
        });
        cy.wait("@getUsers").then(() => {
          cy.wait("@updateUser").then(() => {
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[id=michael]`).find("img").click({ force: true });
            cy.get(".listen-btn").contains("Listen in!");
            cy.request("DELETE", `/users/${id}`);
          });
        });
      });
    });
  });
  //As a user, I want to listen to another user’s current song playing.
  it("Listen to someone elses streaming music", () => {
    cy.visit("localhost:3000");
    cy.intercept("POST", "/users/login").as("loginUser");
    cy.intercept("POST", "/users").as("createUser");
    cy.intercept("GET", "/users").as("getUsers");

    cy.contains("Don't have an account? Create one!").click();
    cy.get("form").find("[name=email]").type("George@google.com");
    cy.get("form").find("[name=username]").type("George");
    cy.get("form").find("[placeholder=Password]").type("SecurePassword");
    cy.get("form").find("[name=confirmPassword]").type("SecurePassword");
    cy.get("button").click();

    cy.wait("@createUser").then((response) => {
      const id = response.response.body.data.id;
      cy.intercept("PATCH", `/users/${id}`).as("updateUser");
      cy.get("form").find("[name=username]").type("George");
      cy.get("form").find("[name=password]").type("SecurePassword");
      cy.get("button").click();
      cy.wait("@loginUser").then(() => {
        cy.on("window:alert", () => {
          cy.get("button").contains("Allow").click();
        });
        cy.wait("@getUsers").then(() => {
          cy.wait("@updateUser").then(() => {
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[id=michael]`).find("img").click({ force: true });
            cy.get(".listen-btn").contains("Listen in!").click({ force: true });
            cy.request("DELETE", `/users/${id}`);
          });
        });
      });
    });
  });
  //As a user I want to see my account information
  it("View the user profile", () => {
    cy.visit("localhost:3000");
    cy.intercept("POST", "/users/login").as("loginUser");
    cy.intercept("POST", "/users").as("createUser");
    cy.intercept("GET", "/users").as("getUsers");

    cy.contains("Don't have an account? Create one!").click();
    cy.get("form").find("[name=email]").type("George@google.com");
    cy.get("form").find("[name=username]").type("George");
    cy.get("form").find("[placeholder=Password]").type("SecurePassword");
    cy.get("form").find("[name=confirmPassword]").type("SecurePassword");
    cy.get("button").click();

    cy.wait("@createUser").then((response) => {
      const id = response.response.body.data.id;
      cy.intercept("PATCH", `/users/${id}`).as("updateUser");
      cy.get("form").find("[name=username]").type("George");
      cy.get("form").find("[name=password]").type("SecurePassword");
      cy.get("button").click();
      cy.wait("@loginUser").then(() => {
        cy.on("window:alert", () => {
          cy.get("button").contains("Allow").click();
        });
        cy.wait("@getUsers").then(() => {
          cy.wait("@updateUser").then(() => {
            cy.get('a[href*="profile"]').click();
            cy.request("DELETE", `/users/${id}`);
          });
        });
      });
    });
  });
  //As a user, I want to be able to logout from SyncStream.
  it("Logout from SyncStream", () => {
    cy.visit("localhost:3000");
    cy.intercept("POST", "/users/login").as("loginUser");
    cy.intercept("POST", "/users").as("createUser");
    cy.intercept("GET", "/users").as("getUsers");

    cy.contains("Don't have an account? Create one!").click();
    cy.get("form").find("[name=email]").type("George@google.com");
    cy.get("form").find("[name=username]").type("George");
    cy.get("form").find("[placeholder=Password]").type("SecurePassword");
    cy.get("form").find("[name=confirmPassword]").type("SecurePassword");
    cy.get("button").click();

    cy.wait("@createUser").then((response) => {
      const id = response.response.body.data.id;
      cy.intercept("PATCH", `/users/${id}`).as("updateUser");
      cy.get("form").find("[name=username]").type("George");
      cy.get("form").find("[name=password]").type("SecurePassword");
      cy.get("button").click();
      cy.wait("@loginUser").then(() => {
        cy.on("window:alert", () => {
          cy.get("button").contains("Allow").click();
        });
        cy.wait("@getUsers").then(() => {
          cy.wait("@updateUser").then(() => {
            cy.get('a[href*="profile"]').click();
            cy.get("button").contains("Logout").click();
            cy.request("DELETE", `/users/${id}`);
          });
        });
      });
    });
  });
});
