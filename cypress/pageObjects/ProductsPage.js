import { BasePage } from "./BasePage";

const INVENTORY_CONTAINER = ".inventory_container";
const ADD_REMOVE_BUTTONS = ".inventory_item_price + button"
const CART_BUTTON = "#shopping_cart_container"
const ITEM_NAMES = ".inventory_item_name"
const ITEM_DESCRIPTIONS = ".inventory_item_desc"
const ITEM_PRICE = ".inventory_item_price"
const CART_ITEMS = ".cart_item"
const CART_BADGE = CART_BUTTON + " span"

export class ProductsPage extends BasePage {
  static validateVisibleInventoryContainer() {
    this.isVisible(INVENTORY_CONTAINER);
  }

  static inventoryContainerDoesNotExist() {
    this.doesNotExist(INVENTORY_CONTAINER);
  }

  static logInUserWithoutUI(user,page) {
      cy.setCookie("session-username",user)
      cy.visit("/"+ page +".html" , {failOnStatusCode: false})
  }

  static addFirstItemToCart() {
    cy.get(ITEM_NAMES).first().then(element => {
      cy.wrap(element.text()).as("lastAddedItemName")
    })
      cy.get(ITEM_DESCRIPTIONS).first().then(element => {
          cy.wrap(element.text()).as("lastAddedItemDescription")
      })
      cy.get(ITEM_PRICE).first().then(element => {
          cy.wrap(element.text()).as("lastAddedItemPrice")
      })
      this.clickFirst(ADD_REMOVE_BUTTONS)
      cy.get(ADD_REMOVE_BUTTONS).first().should("have.text","Remove").
      and("have.css" , "color","rgb(226, 35, 26)")
  }

  static clickCartButton() {
      this.click(CART_BUTTON)
  }

  static validateLastAddedItem() {
      cy.get(CART_ITEMS).should("have.length",1)
      cy.get("@lastAddedItemName").then( itemName => {
        cy.get(ITEM_NAMES).should("have.text",itemName)
      })
      cy.get("@lastAddedItemDescription").then( itemName => {
          cy.get(ITEM_DESCRIPTIONS).should("have.text",itemName)
      })
      cy.get("@lastAddedItemPrice").then( itemName => {
          cy.get(ITEM_PRICE).should("have.text",itemName)
      })
  }

    static validateCartBadgeAmount(amount) {
        this.hasText(CART_BADGE,amount)
    }
}