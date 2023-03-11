Feature: Login page test cases
  Background:
    Given The login page is open


  Scenario:Logging in with a standard user
    And User inputs "standard_user" and "secret_sauce" into the login fields
    And User click on the login button
    Then The inventory container is visible

  Scenario Outline: Error messages with invalid inputs - <testName>
    And User inputs "<username>" and "<password>" into the login fields
    And User click on the login button
    Then Error message saying "<error>" is shown
    Then The inventory container does not exist
    Examples:
      | testName         | username        | password     | error                                                                     |
      | No Username      |                 | secret_sauce | Epic sadface: Username is required                                        |
      | No Password      | standard_user   |              | Epic sadface: Password is required                                        |
      | Invalid Username | standard_user   | dfgsfgsdfgs  | Epic sadface: Username and password do not match any user in this service |
      | Locked out user  | locked_out_user | secret_sauce | Epic sadface: Sorry, this user has been locked out.                       |

  Scenario:Closing the error message
    And User click on the login button
    And User closes the error message
    Then The error message does not exist

    # Feature File (Test scenarios written in human readable form ) ->
    # Step Definition (Test steps linked to function in page object files  , or what the step should do ) ->
    # Page Object class(file) - Actually doing actions with Cypress to interact with elements ->
    # BasePage - Main file to use for re-usable functions

