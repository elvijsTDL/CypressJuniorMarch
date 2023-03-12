const { Then, Given } = require("@badeball/cypress-cucumber-preprocessor");
const { ProductsPage } = require("../../pageObjects/ProductsPage");

Then(/^The inventory container is visible$/, function () {
  ProductsPage.validateVisibleInventoryContainer();
});
Then(/^The inventory container does not exist$/, function () {
  ProductsPage.inventoryContainerDoesNotExist();
});
Given(/^User adds the first item to the cart$/, function () {
  ProductsPage.addFirstItemToCart();
});
Given(/^User goes to the cart page$/, function () {
  ProductsPage.clickCartButton();
});
Then(/^The last added item is visible in the cart$/, function () {
  ProductsPage.validateLastAddedItem();
});
Given(/^The shopping cart badge is "([^"]*)"$/, function (amount) {
  ProductsPage.validateCartBadgeAmount(amount);
});
Given(/^The "([^"]*)" has logged in "([^"]*)" page$/, function (user, page) {
  ProductsPage.logInUserWithoutUI(user, page);
});
Given(/^The cart has some items in it$/, function () {
  ProductsPage.addItemsToCartBeforeTest();
});
Given(/^User removes all of the items that are in the cart$/, function () {
  ProductsPage.removeAllItemsFromCart();
});
Then(/^No items in the cart are visible$/, function () {
  ProductsPage.validateNoItemsAreVisible();
});
Given(/^User sorts the products by "([^"]*)"$/, function (option) {
  ProductsPage.sortProductsBy(option);
});
Then(/^Products shown are sorted by High to Low$/, function () {
  ProductsPage.validateProductsAreSortedByHighToLow();
});
Then(/^Products shown are sorted by Low to high$/, function () {
  ProductsPage.validateProductsAreSortedByLowToHigh();
});
Given(/^User inputs the "([^"]*)" details$/, function (user) {
  ProductsPage.inputUserCheckoutDetails(user);
});
Given(/^User clicks on the continue button$/, function () {
  ProductsPage.clickContinueButton();
});
Then(/^Checkout overview is visible$/, function () {
  ProductsPage.validateCheckoutOverviewIsVisible();
});
Then(
  /^The total price for the items added is calculated correctly$/,
  function () {
    ProductsPage.validateTotalPriceCalculation();
  }
);
Then(/^User clicks on the checkout button$/, function () {
  ProductsPage.clickCheckoutButton()
});

Given(/^Hovering scenario$/, function () {
  ProductsPage.hoveringExample()
});
Given(/^Mocking API error scenario$/, function () {
  ProductsPage.mockingAPIExample()
});