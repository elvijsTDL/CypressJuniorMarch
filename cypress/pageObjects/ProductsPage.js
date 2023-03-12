import { BasePage } from "./BasePage";

const INVENTORY_CONTAINER = ".inventory_container";
const ADD_REMOVE_BUTTONS = ".inventory_item_price + button";
const CART_BUTTON = "#shopping_cart_container";
const ITEM_NAMES = ".inventory_item_name";
const ITEM_DESCRIPTIONS = ".inventory_item_desc";
const ITEM_PRICE = ".inventory_item_price";
const CART_ITEMS = ".cart_item";
const CART_BADGE = CART_BUTTON + " span";
const SORT_CONTAINER = "[data-test=product_sort_container]";
const CHECKOUT_NAME = "[data-test=firstName]";
const CHECKOUT_LAST_NAME = "[data-test=lastName]";
const CHECKOUT_POSTAL_CODE = "[data-test=postalCode]";
const CONTINUE_BUTTON = "[data-test=continue]";
const ITEM_TOTAL = ".summary_subtotal_label";
const TAX_TOTAL = ".summary_tax_label";
const ITEM_AND_TAX_TOTAL = ".summary_total_label";
const CHECKOUT_BUTTON = "[data-test=checkout]"

export class ProductsPage extends BasePage {
  static validateVisibleInventoryContainer() {
    this.isVisible(INVENTORY_CONTAINER);
  }

  static inventoryContainerDoesNotExist() {
    this.doesNotExist(INVENTORY_CONTAINER);
  }

  static logInUserWithoutUI(user, page) {
    cy.setCookie("session-username", user);
    cy.visit("/" + page + ".html", { failOnStatusCode: false });
  }

  static addFirstItemToCart() {
    cy.get(ITEM_NAMES)
      .first()
      .then((element) => {
        cy.wrap(element.text()).as("lastAddedItemName");
      });
    cy.get(ITEM_DESCRIPTIONS)
      .first()
      .then((element) => {
        cy.wrap(element.text()).as("lastAddedItemDescription");
      });
    cy.get(ITEM_PRICE)
      .first()
      .then((element) => {
        cy.wrap(element.text()).as("lastAddedItemPrice");
      });
    this.clickFirst(ADD_REMOVE_BUTTONS);
    cy.get(ADD_REMOVE_BUTTONS)
      .first()
      .should("have.text", "Remove")
      .and("have.css", "color", "rgb(226, 35, 26)");
  }

  static clickCartButton() {
    this.click(CART_BUTTON);
  }

  static validateLastAddedItem() {
    cy.get(CART_ITEMS).should("have.length", 1);
    cy.get("@lastAddedItemName").then((itemName) => {
      cy.get(ITEM_NAMES).should("have.text", itemName);
    });
    cy.get("@lastAddedItemDescription").then((itemName) => {
      cy.get(ITEM_DESCRIPTIONS).should("have.text", itemName);
    });
    cy.get("@lastAddedItemPrice").then((itemName) => {
      cy.get(ITEM_PRICE).should("have.text", itemName);
    });
  }

  static validateCartBadgeAmount(amount) {
    if (parseInt(amount) === 0) {
      this.doesNotExist(CART_BADGE);
    } else {
      this.hasText(CART_BADGE, amount);
    }
  }

  static addItemsToCartBeforeTest() {
    window.localStorage.setItem("cart-contents", "[0,1,2,3,4,5]");
  }

  static removeAllItemsFromCart() {
    cy.get(ADD_REMOVE_BUTTONS).each((el) => {
      cy.wrap(el).click();
    });
    //   this.clickAll(ADD_REMOVE_BUTTONS)
  }

  static validateNoItemsAreVisible() {
    this.doesNotExist(CART_ITEMS);
    this.doesNotExist(ITEM_NAMES);
    this.doesNotExist(ITEM_DESCRIPTIONS);
    this.doesNotExist(ITEM_PRICE);
  }

  static sortProductsBy(option) {
    cy.get(SORT_CONTAINER).select(option);
  }

  static validateProductsAreSortedByHighToLow() {
    let actualArray = [];
    cy.get(ITEM_PRICE).each((el) => {
      actualArray.push(el.text().replace("$", ""));
    });
    cy.wrap(actualArray).then((actual) => {
      let sortedArray = [...actual].sort((a, b) => b - a);
      expect(actual).to.deep.eq(sortedArray);
    });
  }

  static validateProductsAreSortedByLowToHigh() {
    let actualArray = [];
    cy.get(ITEM_PRICE).each((el) => {
      actualArray.push(el.text().replace("$", ""));
    });
    cy.wrap(actualArray).then((actual) => {
      let sortedArray = [...actual].sort((a, b) => a - b);
      expect(actual).to.deep.eq(sortedArray);
    });
  }

  static inputUserCheckoutDetails(user) {
    cy.fixture("users").then((fixture) => {
      if (fixture[user].firstName !== undefined) {
        this.type(CHECKOUT_NAME, fixture[user].firstName);
      }
      if (fixture[user].lastName !== undefined) {
        this.type(CHECKOUT_LAST_NAME, fixture[user].lastName);
      }
      if (fixture[user].postalCode !== undefined) {
        this.type(CHECKOUT_POSTAL_CODE, fixture[user].postalCode);
      }
    });
  }

  static clickContinueButton() {
    this.click(CONTINUE_BUTTON);
  }

  static validateCheckoutOverviewIsVisible() {
    this.isVisible(CART_ITEMS);
  }

  static validateTotalPriceCalculation() {
    let tax = 0.08;
    let prices = [];
    cy.get(ITEM_PRICE).each((el) => {
      prices.push(parseFloat(el.text().replace("$", "")));
    });
    cy.wrap(prices).then((array) => {
      let itemTotal = array.reduce((a, b) => a + b);
      let taxAmount = (itemTotal * tax).toFixed(2);
      let itemAndTaxTotal = parseFloat(itemTotal) + parseFloat(taxAmount);
      cy.get(ITEM_TOTAL).should(
        "have.text",
        "Item total: $" + itemTotal.toFixed(2)
      );
      cy.get(TAX_TOTAL).should("have.text", "Tax: $" + taxAmount);
      cy.get(ITEM_AND_TAX_TOTAL).should(
        "have.text",
        "Total: $" + itemAndTaxTotal
      );
    });
  }

    static clickCheckoutButton() {
        this.click(CHECKOUT_BUTTON)
    }

  static hoveringExample() {
    cy.visit("http://automationpractice.pl/index.php?id_category=3&controller=category")
    cy.get(".product-container").first().trigger("mouseover")
    cy.get(".button-container").should("be.visible")
    cy.get(".product-container").first().trigger("mouseout")
    cy.get(".button-container").should("not.be.visible")
  }

  static mockingAPIExample() {
    // Example of error state of the app
    // cy.intercept("POST","**protocol-v1-goerli" , {
    //   statusCode: 400,
    //   body: {
    //     message: "Whoops something went wrong"
    //   }
    // })
    //Assert that error message is shown etc.

    // Example of returning fake data to the app
    cy.intercept("GET" , "**markets**" , (req) => {
      req.continue( response => {
        response.body[0]["current_price"] = 23475623784652
      })
    })
    cy.visit("https://user-release-v0-24.dev.superfluid.dev/streams/goerli/0x04c054715203c4c74d0a222c647106728971bbc357de456305fb4ee60a60c72d/26")
  }

}
