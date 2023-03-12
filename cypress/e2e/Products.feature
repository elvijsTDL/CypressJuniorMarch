Feature: Products page test cases

  Scenario: Adding an item to the cart
    Given The "standard_user" has logged in "inventory" page
    And User adds the first item to the cart
    And The shopping cart badge is "1"
    And User goes to the cart page
    Then The last added item is visible in the cart

  Scenario: Removing items from the cart
    Given The "standard_user" has logged in "cart" page
