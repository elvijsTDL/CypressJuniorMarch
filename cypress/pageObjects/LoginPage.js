import { BasePage } from "./BasePage";

const USERNAME_FIELD = '[data-test="username"]';
const PASSWORD_FIELD = "#password";
const SUBMIT_BUTTON = ".submit-button";
const ERROR_MESSAGE = "[data-test=error]";
const ERROR_CLOSE_BUTTON = "[data-test=error] button";

export class LoginPage extends BasePage {
  static inputUserNameAndPassword(username, password) {
    if (username !== "") {
      this.type(USERNAME_FIELD, username);
    }
    if (password !== "") {
      this.type(PASSWORD_FIELD, password);
    }
  }

  static clickLoginButton() {
    this.click(SUBMIT_BUTTON);
  }

  static validateErrorMessage(message) {
    this.hasText(ERROR_MESSAGE, message);
  }

  static closeErrorMessage() {
    this.click(ERROR_CLOSE_BUTTON)
  }

  static validateNoErrorMessage() {
    this.doesNotExist(ERROR_MESSAGE)
  }
}
