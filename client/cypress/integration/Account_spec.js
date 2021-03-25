describe("Register Test", () => {
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
      cy.wait("@loginUser").then((response) => {
        cy.on("window:alert", () => {
          cy.get("button").contains("Allow").click();
        });
        cy.wait("@getUsers").then((response) => {
          cy.wait("@updateUser").then((response) => {
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
      cy.wait("@loginUser").then((response) => {
        cy.on("window:alert", () => {
          cy.get("button").contains("Allow").click();
        });
        cy.wait("@getUsers").then((response) => {
          cy.wait("@updateUser").then((response) => {
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[id=test]`).find("svg").click();
            cy.get(".info-window-style-map").contains(
              "User isn't playing anything currently"
            );
            cy.request("DELETE", `/users/${id}`);
          });
        });
      });
    });
  });

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
      cy.wait("@loginUser").then((response) => {
        cy.on("window:alert", () => {
          cy.get("button").contains("Allow").click();
        });
        cy.wait("@getUsers").then((response) => {
          cy.wait("@updateUser").then((response) => {
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[id=michael]`).find("svg").click({ force: true });
            cy.get(".listen-btn").contains("Listen in!");
            cy.request("DELETE", `/users/${id}`);
          });
        });
      });
    });
  });

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
      cy.wait("@loginUser").then((response) => {
        cy.on("window:alert", () => {
          cy.get("button").contains("Allow").click();
        });
        cy.wait("@getUsers").then((response) => {
          cy.wait("@updateUser").then((response) => {
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[title="Zoom out"]`).click({ force: true });
            cy.get(`[id=michael]`).find("svg").click({ force: true });
            cy.get(".listen-btn").contains("Listen in!").click({ force: true });
            cy.request("DELETE", `/users/${id}`);
          });
        });
      });
    });
  });

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
      cy.wait("@loginUser").then((response) => {
        cy.on("window:alert", () => {
          cy.get("button").contains("Allow").click();
        });
        cy.wait("@getUsers").then((response) => {
          cy.wait("@updateUser").then((response) => {
            cy.get('a[href*="profile"]').click();
            cy.request("DELETE", `/users/${id}`);
          });
        });
      });
    });
  });

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
      cy.wait("@loginUser").then((response) => {
        cy.on("window:alert", () => {
          cy.get("button").contains("Allow").click();
        });
        cy.wait("@getUsers").then((response) => {
          cy.wait("@updateUser").then((response) => {
            cy.get('a[href*="profile"]').click();
            cy.get("button").contains("Logout").click();
            cy.request("DELETE", `/users/${id}`);
          });
        });
      });
    });
  });
});
