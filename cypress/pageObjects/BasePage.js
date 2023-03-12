export class BasePage {
  static click(selector) {
    cy.get(selector).click();
  }

  static clickFirst(selector) {
    cy.get(selector).first().click();
  }

  static clickAll(selector) {
    cy.get(selector).click({ multiple: true });
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
