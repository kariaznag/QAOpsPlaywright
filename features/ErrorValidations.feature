Feature: Ecommerce validations2

  Rule: the wrong logins are not accepted 

    @Validation
    Scenario Outline: Validating the error messages for wrong logins
      Given a login to ecommerce2 application with "<username>" and "<password>"
      Then Verify Error message is displayed

      Examples:
          | username                   | password            |
          | karima.aznagg@gmail.com    | Chocolata*90        |
          | rahulshettyacademy         | Learning@830$3mK88  |
