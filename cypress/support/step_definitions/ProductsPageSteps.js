const { Then } = require("@badeball/cypress-cucumber-preprocessor");
const { ProductsPage } = require("../../pageObjects/ProductsPage");

Then(/^The inventory container is visible$/, function () {
  ProductsPage.validateVisibleInventoryContainer();
});
Then(/^The inventory container does not exist$/, function () {
  ProductsPage.inventoryContainerDoesNotExist();
});
