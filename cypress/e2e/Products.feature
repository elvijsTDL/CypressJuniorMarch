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

  @only
  Scenario: Sorting products by High to Low
    Given The "standard_user" has logged in "inventory" page
    And User sorts the products by "hilo"
    Then Products shown are sorted by High to Low

  Scenario: Sorting products by Low To High
    Given The "standard_user" has logged in "inventory" page
    And User sorts the products by "lohi"
    Then Products shown are sorted by Low to high
