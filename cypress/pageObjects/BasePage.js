export class BasePage {
  static click(selector) {
    cy.get(selector).click();
  }

  static type(selector, text) {
    cy.get(selector).type(text);
  }

  static hasText(selector, text) {
    cy.get(selector).should("have.text", text).and("be.visible");
  }

  static isVisible(selector) {
    cy.get(selector).should("be.visible");
  }

  static doesNotExist(selector) {
    cy.get(selector).should("not.exist");
  }
}
