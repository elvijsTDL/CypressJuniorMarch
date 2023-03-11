describe("Login page test cases", () => {
  before(() => {});

  beforeEach(() => {
    cy.visit("/");
  });

  after(() => {});

  afterEach(() => {});

  it("Logging in with a standard user", () => {
    //Data-test attribute, the best to use for automated test cases, it's specifically added to the page for testing
    cy.get('[data-test="username"]').type("standard_user");
    //ID , second best if no test attributes are available, as these are supported to be unique in the page
    cy.get("#password").type("secret_sauce");
    // Classes and other attributes can be used to look for unique elements if no ids or test attributes are present
    // Be carefully to not make them too flaky and DON'T copy paste the long strings cypress/browser returns
    cy.get(".submit-button").click();
    cy.get(".inventory_container").should("be.visible");
    //Add stuff here to check if correct user is logged in if possible
  });

  it("Error message when trying to log in without a password", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get(".submit-button").click();
    cy.get("[data-test=error]").should(
      "have.text",
      "Epic sadface: Password is required"
    );
    cy.get(".inventory_container").should("not.exist");
  });

  it("Error message when trying to log in without a username", () => {
    cy.get("#password").type("secret_sauce");
    cy.get(".submit-button").click();
    cy.get("[data-test=error]").should(
      "have.text",
      "Epic sadface: Username is required"
    );
    cy.get(".inventory_container").should("not.exist");
  });

  it("Error message when trying to log in with an invalid password", () => {
    cy.get('[data-test="username"]').type("standard_user");
    cy.get("#password").type("sdfgsdfgsfdg");
    cy.get(".submit-button").click();
    cy.get("[data-test=error]").should(
      "have.text",
      "Epic sadface: Username and password do not match any user in this service"
    );
    cy.get(".inventory_container").should("not.exist");
  });

  it("Error message when trying to log in with a locked out user", () => {
    cy.get('[data-test="username"]').type("locked_out_user");
    cy.get("#password").type("secret_sauce");
    cy.get(".submit-button").click();
    cy.get("[data-test=error]").should(
      "have.text",
      "Epic sadface: Sorry, this user has been locked out."
    );
    cy.get(".inventory_container").should("not.exist");
  });

  it("Closing the error message", () => {
    cy.get(".submit-button").click();
    cy.get("[data-test=error]").should(
      "have.text",
      "Epic sadface: Username is required"
    );
    cy.get(".inventory_container").should("not.exist");
    cy.get("[data-test=error] button").click();
    cy.get("[data-test=error]").should("not.exist");
  });
});
