Feature: Ecommerce validations

  Rule: Placing the Order succesfully 

    Scenario: Placing the order
      Given a login to ecommerce application with "karima.aznagg@gmail.com" and "Chocolata*90"
      When add "ZARA COAT 4" to cart
      When checkout the order and submit the order
      Then Verify order submmited successfully


  Rule: the wrong logins are not accepted 

    @Validation
    Scenario Outline: Validating the error messages for wrong logins
      Given a login to ecommerce2 application with "<username>" and "<password>"
      Then Verify Error message is displayed

      Examples:
          | username                   | password            |
          | karima.aznagg@gmail.com    | Chocolata*90        |
          | rahulshettyacademy         | Learning@830$3mK88  |
