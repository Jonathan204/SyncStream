import { loginUser } from "../../src/actions/account";

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
  it("Clicks on current user", () => {
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
      cy.get("form").find("[name=username]").type("George");
      cy.get("form").find("[name=password]").type("SecurePassword");
      cy.get("button").click();
      cy.wait("@loginUser").then((response) => {
        cy.on("window:alert", () => {
          cy.get("button").contains("Allow").click();
        });
        cy.wait("@getUsers").then(response, () => {
          cy.wait(1000);
          cy.request("DELETE", `/users/${id}`);
        });
      });
    });
  });
});
