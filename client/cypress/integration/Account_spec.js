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
});
