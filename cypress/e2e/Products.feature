Feature: Products page test cases

  Scenario: Adding an item to the cart
    Given The "standard_user" has logged in "inventory" page
    And User adds the first item to the cart
    And The shopping cart badge is "1"
    And User goes to the cart page
    Then The last added item is visible in the cart

  Scenario: Removing items from the cart
    Given The cart has some items in it
    Given The "standard_user" has logged in "cart" page
    And User removes all of the items that are in the cart
    Then No items in the cart are visible
    And The shopping cart badge is "0"

  Scenario: Sorting products by High to Low
    Given The "standard_user" has logged in "inventory" page
    And User sorts the products by "hilo"
    Then Products shown are sorted by High to Low

  Scenario: Sorting products by Low To High
    Given The "standard_user" has logged in "inventory" page
    And User sorts the products by "lohi"
    Then Products shown are sorted by Low to high

  Scenario: User can successfully navigate through the checkout
    Given The cart has some items in it
    And The "standard_user" has logged in "checkout-step-one" page
    And User inputs the "bob" details
    And User clicks on the continue button
    Then Checkout overview is visible

  Scenario Outline: Checkout information error cases
    Given The "standard_user" has logged in "checkout-step-one" page
    And User inputs the "<user>" details
    And User clicks on the continue button
    Then Error message saying "<error>" is shown
    Examples:
      | user  | error                          |
      | userWithoutName   | Error: First Name is required  |
      | userWithoutLastName | Error: Last Name is required   |
      | userWithoutPostCode  | Error: Postal Code is required |

  Scenario: Validating the total price calculation
    Given The cart has some items in it
    And The "standard_user" has logged in "checkout-step-two" page
    Then The total price for the items added is calculated correctly

  Scenario: Comparing good fast tests vs doing stuff with UI
    Given The login page is open
    And User inputs "standard_user" and "secret_sauce" into the login fields
    And User click on the login button
    Then The inventory container is visible
    And User adds the first item to the cart
    And The shopping cart badge is "1"
    And User goes to the cart page
    And User inputs the "bob" details
    And User clicks on the continue button
    Then Checkout overview is visible
    Then The total price for the items added is calculated correctly
