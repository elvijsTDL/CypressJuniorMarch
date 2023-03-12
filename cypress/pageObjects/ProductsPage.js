import { BasePage } from "./BasePage";

const INVENTORY_CONTAINER = ".inventory_container";
const ADD_REMOVE_BUTTONS = ".inventory_item_price + button"
const CART_BUTTON = "#shopping_cart_container"
const ITEM_NAMES = ".inventory_item_name"
const ITEM_DESCRIPTIONS = ".inventory_item_desc"
const ITEM_PRICE = ".inventory_item_price"
const CART_ITEMS = ".cart_item"
const CART_BADGE = CART_BUTTON + " span"
const SORT_CONTAINER = "[data-test=product_sort_container]"

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
      if(parseInt(amount) === 0) {
          this.doesNotExist(CART_BADGE)
      } else {
          this.hasText(CART_BADGE,amount)
      }
    }

    static addItemsToCartBeforeTest() {
        window.localStorage.setItem("cart-contents","[0,1,2,3,4,5]")
    }

    static removeAllItemsFromCart() {
      cy.get(ADD_REMOVE_BUTTONS).each(el => {
          cy.wrap(el).click()
      })
      //   this.clickAll(ADD_REMOVE_BUTTONS)
    }

    static validateNoItemsAreVisible() {
        this.doesNotExist(CART_ITEMS)
        this.doesNotExist(ITEM_NAMES)
        this.doesNotExist(ITEM_DESCRIPTIONS)
        this.doesNotExist(ITEM_PRICE)
    }

    static sortProductsBy(option) {
        cy.get(SORT_CONTAINER).select(option)
    }

    static validateProductsAreSortedByHighToLow() {
      let actualArray = []
        cy.get(ITEM_PRICE).each( el => {
            actualArray.push(el.text().replace("$",""))
        })
        cy.wrap(actualArray).then( actual => {
            let sortedArray = [...actual].sort((a,b) => b - a)
            expect(actual).to.deep.eq(sortedArray)
        })

    }
}