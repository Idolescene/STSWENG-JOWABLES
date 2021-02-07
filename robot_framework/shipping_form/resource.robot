*** Settings ***
Documentation      A test suite with a single test for a invalid shipping
...
...                This test has a workflow that is created using keywords
...                directly from SeleniumLibrary
Library            SeleniumLibrary

*** Variables ***
${SERVER}                salawalco.herokuapp.com
${BROWSER}               Chrome
${DELAY}                 0
${ORIGINAL EMAIL}        sophiasee@gmail.com
${ORIGINAL PASSWORD}     12345678
${VALID EMAIL}           sophiasee1@gmail.com
${VALID PASSWORD}        123456789
${INVALID EMAIL}         email@-example.com
${INVALID PASSWORD}      123
${NULL EMAIL}            
${NULL PASSWORD}         
${ORIGINAL FULL NAME}    Sophia See
${VALID FULL NAME}       Sophia Somethin See
${INVALID FULL NAME}     1110 0100 1111 
${NULL FULL NAME}
${ORIGINAL CONTACT NUM}  09123456789
${VALID CONTACT NUM}     09123456780
${INVALID CONTACT NUM}   123131
${NULL CONTACT NUM}
${ORIGINAL HOUSE NUM}    House #9, Building A, Streeters
${VALID HOUSE NUM}       Unit 4A, Building C, Lolo Street
${INVALID HOUSE NUM}     %$@#$%@$
${NULL HOUSE NUM}        
${ORIGINAL BARANGAY}     Barangay A
${VALID BARANGAY}        Barangay 112
${INVALID BARANGAY}      %$@#$
${NULL BARANGAY}
${ORIGINAL CITY}         Manila
${VALID CITY}            Quezon City
${INVALID CITY}          !#!$$@#
${NULL CITY}
${ORIGINAL PROVINCE}     Metro Manila
${VALID PROVINCE}        Tagaytay
${INVALID PROVINCE}      !@#!@##!
${NULL PROVINCE}
${AUTO GEN}                  NONE
${MAIN URL}              https://${SERVER}/
${LOGIN URL}             https://${SERVER}/profile
${CHECKOUT URL}          https://${SERVER}/checkout


*** Keywords ***
Open Browser to Home Page
    Open Browser                    ${MAIN URL}        ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed              ${DELAY}
    Page Should Contain Element     class:masthead-banner

Go to Login Page
    Open Browser to Home Page
    Click Profile Icon
    Login Page Should Be Open

Login Page Should Be Open
    Page Should Contain Element     id:logbtn

Login Successfully
    Go to Login Page
    Input Email in Login                     ${ORIGINAL EMAIL}
    Input Password in Login                  ${ORIGINAL PASSWORD}
    Click Login Button
    Location Should Be                       ${MAIN URL}

Add Products To Cart
    Click Element                   id:nav-catalogue
    Click Link                      id:khaki-shorter-shorts-btn
    Click Button                   id:small
    Click Button                   id:btnPressed

User Profile Should Be Accessible
    Page Should Contain Element     class:profile-edit

Go To Profile
    Click Profile Icon
    Location Should Be              ${LOGIN URL}
    User Profile Should Be Accessible

Go To Checkout
    Click Element                 class:fa-shopping-cart
    Set Selenium Speed                      0.5
    Click Link                    id:editcart-btn
    Set Selenium Speed                      0
    Click Link                    class:checkStock

Delete All Items in Cart
    Click Element                 class:fa-shopping-cart
    Click Link                    id:editcart-btn
    Click Link                    class:deleteCart

Input Email in Login
    [Arguments]        ${email}
    Input Text                      id:logemail           ${email}

Input Password in Login
    [Arguments]        ${password}
    Input Text                     id:logpass             ${password}

Input Full Name in Shipping Form
    [Arguments]        ${fullname}
    Input Text                     id:fullname-shipping  ${fullname}

Input Contact Number in Shipping Form
    [Arguments]        ${contactnum}
    Input Text                      id:contactnum-shipping         ${contactnum} 

Input Email Address in Shipping Form
    [Arguments]        ${email}
    Input Text                      id:emailadd-shipping           ${email}

Input House Number in Shipping Form
    [Arguments]        ${housenum}
    Input Text                      id:streetadd-shipping           ${housenum}

Input Barangay in Shipping Form
    [Arguments]        ${barangay}
    Input Text                      id:barangay-shipping           ${barangay}

Input City in Shipping Form
    [Arguments]        ${city}
    Input Text                      id:city-shipping               ${city}

Input Province in Shipping Form
    [Arguments]        ${province}
    Input Text                      id:province-shipping           ${province}

Click Login Button
    Click Button                    id:logbtn

Click Profile Icon
    Click Element                   id:proficon

Edit Profile    
    Click Button                    class:profile-edit

Edit Shipping Details
    Click Element                    id:shipbutton

Submit Shipping Form
    Click Button                            id:ship-btn

Submit Order
    Click Button                            id:checkout-btn
    Set Selenium Speed              0.5

Checkout Should Have Failed (Invalid Email Address)
    Element Text Should Be          id=error-msg                  Error: Please provide a valid email.

Checkout Should Have Failed (Null Email Address)
    Element Text Should Be          id=error-msg                  Error: Email is required. Please provide a valid email.

Checkout Should Have Failed (Invalid Full Name)
    Element Text Should Be          id=error-msg                  Error: Name should only contain letters, periods and spaces.

Checkout Should Have Failed (Invalid Contact Number)
    Element Text Should Be          id=error-msg                  Error: Contact number should be 11 digits in length.

Checkout Should Have Failed (Invalid House Number)
    Element Text Should Be          id=error-msg                  Error: House number should only contain letters, numbers, periods, dashes, apostrophes and spaces.

Checkout Should Have Failed (Invalid Barangay)
    Element Text Should Be          id=error-msg                  Error: Barangay should only contain letters, numbers and spaces.

Checkout Should Have Failed (Invalid City)
    Element Text Should Be          id=error-msg                  Error: City should only contain letters, periods, dashes and spaces.

Checkout Should Have Failed (Invalid Province)
    Element Text Should Be          id=error-msg                  Error: Province should only contain letters and spaces.

Checkout Should Have Failed (Null Full Name)
    Element Text Should Be          id=error-msg                  Error: Full Name is required. Name should only contain letters, periods and spaces.

Checkout Should Have Failed (Null Contact Number)
    Element Text Should Be          id=error-msg                  Error: Contact number should be 11 digits in length. Contact number should only be composed of numbers.

Checkout Should Have Failed (Null House Number)
    Element Text Should Be          id=error-msg                 Error: House Number is required. House number should only contain letters, numbers, periods, dashes, apostrophes and spaces.

Checkout Should Have Failed (Null Barangay)
    Element Text Should Be          id=error-msg                 Error: Barangay is required. Barangay should only contain letters, numbers and spaces.

Checkout Should Have Failed (Null City)
    Element Text Should Be          id=error-msg                 Error: City is required. City should only contain letters, periods, dashes and spaces.

Checkout Should Have Failed (Null Province)
    Element Text Should Be          id=error-msg                 Error: Province is required. Province should only contain letters and spaces.

Checkout Should Have Failed (No Payment Method)
    Element Text Should Be          id=error-msg                 Error: Please select a method of payment.

Checkout Should Have Failed (No Items in Cart)
    Element Text Should Be          id=error-msg                 Error: No items in your cart.

Checkout Should Have Failed (Auto-Generated House Num)
    Element Text Should Be          id=error-msg                 Error: House Number should not be NONE.

Checkout Should Have Failed (Auto-Generated Barangay)
    Element Text Should Be          id=error-msg                 Error: Barangay should not be NONE.

Checkout Should Have Failed (Auto-Generated City)
    Element Text Should Be          id=error-msg                 Error: City should not be NONE.

Checkout Should Have Failed (Auto-Generated Province)
    Element Text Should Be          id=error-msg                 Error: Province should not be NONE.

Checkout Should Be Successful
    Element Should Contain          id=success-div           Success: Items ordered successfully! Order number: 

