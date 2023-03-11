const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");
const { LoginPage } = require("../../pageObjects/LoginPage");

Given(/^The login page is open$/, function () {
  cy.visit("/");
});
Given(
  /^User inputs "([^"]*)" and "([^"]*)" into the login fields$/,
  function (username, password) {
    LoginPage.inputUserNameAndPassword(username, password);
  }
);
Given(/^User click on the login button$/, function () {
  LoginPage.clickLoginButton();
});
Then(/^Error message saying "([^"]*)" is shown$/, function (message) {
  LoginPage.validateErrorMessage(message);
});
Given(/^User closes the error message$/, function () {
  LoginPage.closeErrorMessage()
});
Then(/^The error message does not exist$/, function () {
  LoginPage.validateNoErrorMessage()
});