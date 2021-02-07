*** Settings ***
Documentation      A test suite with a single test for a invalid shipping details in checkout
...
...                This test has a workflow that is created using keywords
...                directly from SeleniumLibrary
Suite Setup        Login Successfully
Suite Teardown     Close Browser
# Test Setup         Go To Checkout
Resource           resource.robot

*** Test Cases ***
Unsuccessful Checkout (Invalid Full Name)
    Add Products To Cart
    Go To Checkout
    Input Full Name in Shipping Form        ${INVALID FULL NAME} 
    Input Contact Number in Shipping Form   ${VALID CONTACT NUM}
    Input Email Address in Shipping Form    ${VALID EMAIL} 
    Input House Number in Shipping Form     ${VALID CONTACT NUM}
    Input Barangay in Shipping Form         ${VALID BARANGAY}
    Input City in Shipping Form             ${VALID CITY} 
    Input Province in Shipping Form         ${VALID PROVINCE} 
    Click Button                            id:gcash-btn
    Submit Shipping Form
    Set Selenium Speed                      0.5
    Submit Order
    Checkout Should Have Failed (Invalid Full Name)
    Set Selenium Speed              ${DELAY}
    # Delete All Items in Cart

Unsuccessful Checkout (Invalid Contact Number)
    Add Products To Cart
    Go To Checkout
    Input Full Name in Shipping Form        ${VALID FULL NAME} 
    Input Contact Number in Shipping Form   ${INVALID CONTACT NUM}
    Input Email Address in Shipping Form    ${VALID EMAIL} 
    Input House Number in Shipping Form     ${VALID CONTACT NUM}
    Input Barangay in Shipping Form         ${VALID BARANGAY}
    Input City in Shipping Form             ${VALID CITY} 
    Input Province in Shipping Form         ${VALID PROVINCE} 
    Click Button                            id:gcash-btn
    Submit Shipping Form
    Set Selenium Speed                      0.5
    Submit Order
    Checkout Should Have Failed (Invalid Contact Number)
    Set Selenium Speed              ${DELAY}
    # Delete All Items in Cart

Unsuccessful Checkout (Invalid Email Address)
    Add Products To Cart
    Go To Checkout
    Input Full Name in Shipping Form        ${VALID FULL NAME} 
    Input Contact Number in Shipping Form   ${VALID CONTACT NUM}
    Input Email Address in Shipping Form    ${INVALID EMAIL} 
    Input House Number in Shipping Form     ${VALID CONTACT NUM}
    Input Barangay in Shipping Form         ${VALID BARANGAY}
    Input City in Shipping Form             ${VALID CITY} 
    Input Province in Shipping Form         ${VALID PROVINCE} 
    Click Button                            id:gcash-btn
    Submit Shipping Form
    Set Selenium Speed                      0.5
    Submit Order
    Checkout Should Have Failed (Invalid Email Address)
    Set Selenium Speed              ${DELAY}
    # Delete All Items in Cart

Unsuccessful Checkout (Invalid House Number)
    Add Products To Cart
    Go To Checkout
    Input Full Name in Shipping Form        ${VALID FULL NAME} 
    Input Contact Number in Shipping Form   ${VALID CONTACT NUM}
    Input Email Address in Shipping Form    ${VALID EMAIL} 
    Input House Number in Shipping Form     ${INVALID HOUSE NUM}
    Input Barangay in Shipping Form         ${VALID BARANGAY}
    Input City in Shipping Form             ${VALID CITY} 
    Input Province in Shipping Form         ${VALID PROVINCE} 
    Click Button                            id:gcash-btn
    Submit Shipping Form
    Set Selenium Speed                      0.5
    Submit Order
    Checkout Should Have Failed (Invalid House Number)
    Set Selenium Speed              ${DELAY}
    # Delete All Items in Cart

Unsuccessful Checkout (Invalid Barangay)
    Add Products To Cart
    Go To Checkout
    Input Full Name in Shipping Form        ${VALID FULL NAME} 
    Input Contact Number in Shipping Form   ${VALID CONTACT NUM}
    Input Email Address in Shipping Form    ${VALID EMAIL} 
    Input House Number in Shipping Form     ${VALID CONTACT NUM}
    Input Barangay in Shipping Form         ${INVALID BARANGAY}
    Input City in Shipping Form             ${VALID CITY} 
    Input Province in Shipping Form         ${VALID PROVINCE} 
    Click Button                            id:gcash-btn
    Submit Shipping Form
    Set Selenium Speed                      0.5
    Submit Order
    Checkout Should Have Failed (Invalid Barangay)
    Set Selenium Speed              ${DELAY}
    # Delete All Items in Cart

Unsuccessful Checkout (Invalid City)
    Add Products To Cart
    Go To Checkout
    Input Full Name in Shipping Form        ${VALID FULL NAME} 
    Input Contact Number in Shipping Form   ${VALID CONTACT NUM}
    Input Email Address in Shipping Form    ${VALID EMAIL} 
    Input House Number in Shipping Form     ${VALID CONTACT NUM}
    Input Barangay in Shipping Form         ${VALID BARANGAY}
    Input City in Shipping Form             ${INVALID CITY} 
    Input Province in Shipping Form         ${VALID PROVINCE} 
    Click Button                            id:gcash-btn
    Submit Shipping Form
    Set Selenium Speed                      0.5
    Submit Order
    Checkout Should Have Failed (Invalid City)
    Set Selenium Speed              ${DELAY}
    # Delete All Items in Cart

Unsuccessful Checkout (Invalid Province)
    Add Products To Cart
    Go To Checkout
    Input Full Name in Shipping Form        ${VALID FULL NAME} 
    Input Contact Number in Shipping Form   ${VALID CONTACT NUM}
    Input Email Address in Shipping Form    ${VALID EMAIL} 
    Input House Number in Shipping Form     ${VALID CONTACT NUM}
    Input Barangay in Shipping Form         ${VALID BARANGAY}
    Input City in Shipping Form             ${VALID CITY} 
    Input Province in Shipping Form         ${INVALID PROVINCE} 
    Click Button                            id:gcash-btn
    Submit Shipping Form
    Set Selenium Speed                      0.5
    Submit Order
    Checkout Should Have Failed (Invalid Province)
    Set Selenium Speed              ${DELAY}
    # Delete All Items in Cart

Unsuccessful Checkout (Null Full Name)
    Add Products To Cart
    Go To Checkout
    Input Full Name in Shipping Form        ${NULL FULL NAME} 
    Input Contact Number in Shipping Form   ${VALID CONTACT NUM}
    Input Email Address in Shipping Form    ${VALID EMAIL} 
    Input House Number in Shipping Form     ${VALID CONTACT NUM}
    Input Barangay in Shipping Form         ${VALID BARANGAY}
    Input City in Shipping Form             ${VALID CITY} 
    Input Province in Shipping Form         ${VALID PROVINCE} 
    Click Button                            id:gcash-btn
    Submit Shipping Form
    Set Selenium Speed                      0.5
    Submit Order
    Checkout Should Have Failed (Null Full Name)
    Set Selenium Speed              ${DELAY}
    # Delete All Items in Cart

Unsuccessful Checkout (Null Contact Number)
    Add Products To Cart
    Go To Checkout
    Input Full Name in Shipping Form        ${VALID FULL NAME} 
    Input Contact Number in Shipping Form   ${NULL CONTACT NUM}
    Input Email Address in Shipping Form    ${VALID EMAIL} 
    Input House Number in Shipping Form     ${VALID CONTACT NUM}
    Input Barangay in Shipping Form         ${VALID BARANGAY}
    Input City in Shipping Form             ${VALID CITY} 
    Input Province in Shipping Form         ${VALID PROVINCE} 
    Click Button                            id:gcash-btn
    Submit Shipping Form
    Set Selenium Speed                      0.5
    Submit Order
    Checkout Should Have Failed (Null Contact Number)
    Set Selenium Speed              ${DELAY}
    # Delete All Items in Cart

Unsuccessful Checkout (Null Email Address)
    Add Products To Cart
    Go To Checkout
    Input Full Name in Shipping Form        ${VALID FULL NAME} 
    Input Contact Number in Shipping Form   ${VALID CONTACT NUM}
    Input Email Address in Shipping Form    ${NULL EMAIL} 
    Input House Number in Shipping Form     ${VALID CONTACT NUM}
    Input Barangay in Shipping Form         ${VALID BARANGAY}
    Input City in Shipping Form             ${VALID CITY} 
    Input Province in Shipping Form         ${VALID PROVINCE} 
    Click Button                            id:gcash-btn
    Submit Shipping Form
    Set Selenium Speed                      0.5
    Submit Order
    Checkout Should Have Failed (Null Email Address)
    Set Selenium Speed              ${DELAY}
    # Delete All Items in Cart

Unsuccessful Checkout (Null House Number)
    Add Products To Cart
    Go To Checkout
    Input Full Name in Shipping Form        ${VALID FULL NAME} 
    Input Contact Number in Shipping Form   ${VALID CONTACT NUM}
    Input Email Address in Shipping Form    ${VALID EMAIL} 
    Input House Number in Shipping Form     ${NULL CONTACT NUM}
    Input Barangay in Shipping Form         ${VALID BARANGAY}
    Input City in Shipping Form             ${VALID CITY} 
    Input Province in Shipping Form         ${VALID PROVINCE} 
    Click Button                            id:gcash-btn
    Submit Shipping Form
    Set Selenium Speed                      0.5
    Submit Order
    Checkout Should Have Failed (Null House Number)
    Set Selenium Speed              ${DELAY}
    # Delete All Items in Cart

Unsuccessful Checkout (Null Barangay)
    Add Products To Cart
    Go To Checkout
    Input Full Name in Shipping Form        ${VALID FULL NAME} 
    Input Contact Number in Shipping Form   ${VALID CONTACT NUM}
    Input Email Address in Shipping Form    ${VALID EMAIL} 
    Input House Number in Shipping Form     ${VALID CONTACT NUM}
    Input Barangay in Shipping Form         ${NULL BARANGAY}
    Input City in Shipping Form             ${VALID CITY} 
    Input Province in Shipping Form         ${VALID PROVINCE} 
    Click Button                            id:gcash-btn
    Submit Shipping Form
    Set Selenium Speed                      0.5
    Submit Order
    Checkout Should Have Failed (Null Barangay)
    Set Selenium Speed              ${DELAY}
    # Delete All Items in Cart

Unsuccessful Checkout (Null City)
    Add Products To Cart
    Go To Checkout
    Input Full Name in Shipping Form        ${VALID FULL NAME} 
    Input Contact Number in Shipping Form   ${VALID CONTACT NUM}
    Input Email Address in Shipping Form    ${VALID EMAIL} 
    Input House Number in Shipping Form     ${VALID CONTACT NUM}
    Input Barangay in Shipping Form         ${VALID BARANGAY}
    Input City in Shipping Form             ${NULL CITY} 
    Input Province in Shipping Form         ${VALID PROVINCE} 
    Click Button                            id:gcash-btn
    Submit Shipping Form
    Set Selenium Speed                      0.5
    Submit Order
    Checkout Should Have Failed (Null City)
    Set Selenium Speed              ${DELAY}
    # Delete All Items in Cart

Unsuccessful Checkout (Null Province)
    Add Products To Cart
    Go To Checkout
    Input Full Name in Shipping Form        ${VALID FULL NAME} 
    Input Contact Number in Shipping Form   ${VALID CONTACT NUM}
    Input Email Address in Shipping Form    ${VALID EMAIL} 
    Input House Number in Shipping Form     ${VALID CONTACT NUM}
    Input Barangay in Shipping Form         ${VALID BARANGAY}
    Input City in Shipping Form             ${VALID CITY} 
    Input Province in Shipping Form         ${NULL PROVINCE} 
    Click Button                            id:gcash-btn
    Submit Shipping Form
    Set Selenium Speed                      0.5
    Submit Order
    Checkout Should Have Failed (Null Province)
    Set Selenium Speed              ${DELAY}
    # Delete All Items in Cart

Unsuccessful Checkout (Auto-Generated Barangay)
    Add Products To Cart
    Go To Checkout
    Input Full Name in Shipping Form        ${VALID FULL NAME} 
    Input Contact Number in Shipping Form   ${VALID CONTACT NUM}
    Input Email Address in Shipping Form    ${VALID EMAIL} 
    Input House Number in Shipping Form     ${VALID CONTACT NUM}
    Input Barangay in Shipping Form         ${NONE}
    Input City in Shipping Form             ${VALID CITY} 
    Input Province in Shipping Form         ${VALID PROVINCE} 
    Click Button                            id:gcash-btn
    Submit Shipping Form
    Set Selenium Speed                      0.5
    Submit Order
    Checkout Should Have Failed (Null Province)
    Set Selenium Speed              ${DELAY}
    # Delete All Items in Cart

Unsuccessful Checkout (Auto-Generated City)
    Add Products To Cart
    Go To Checkout
    Input Full Name in Shipping Form        ${VALID FULL NAME} 
    Input Contact Number in Shipping Form   ${VALID CONTACT NUM}
    Input Email Address in Shipping Form    ${VALID EMAIL} 
    Input House Number in Shipping Form     ${VALID CONTACT NUM}
    Input Barangay in Shipping Form         ${VALID BARANGAY}
    Input City in Shipping Form             ${NONE} 
    Input Province in Shipping Form         ${VALID PROVINCE} 
    Click Button                            id:gcash-btn
    Submit Shipping Form
    Set Selenium Speed                      0.5
    Submit Order
    Checkout Should Have Failed (Null Province)
    Set Selenium Speed              ${DELAY}
    # Delete All Items in Cart

Unsuccessful Checkout (Auto-generated Province)
    Add Products To Cart
    Go To Checkout
    Input Full Name in Shipping Form        ${VALID FULL NAME} 
    Input Contact Number in Shipping Form   ${VALID CONTACT NUM}
    Input Email Address in Shipping Form    ${VALID EMAIL} 
    Input House Number in Shipping Form     ${VALID CONTACT NUM}
    Input Barangay in Shipping Form         ${VALID BARANGAY}
    Input City in Shipping Form             ${VALID CITY} 
    Input Province in Shipping Form         ${NONE} 
    Click Button                            id:gcash-btn
    Submit Shipping Form
    Set Selenium Speed                      0.5
    Submit Order
    Checkout Should Have Failed (Null Province)
    Set Selenium Speed              ${DELAY}
    # Delete All Items in Cart

Unsuccessful Checkout (No Payment Method)
    Add Products To Cart
    Go To Checkout
    Input Full Name in Shipping Form        ${VALID FULL NAME} 
    Input Contact Number in Shipping Form   ${VALID CONTACT NUM}
    Input Email Address in Shipping Form    ${VALID EMAIL} 
    Input House Number in Shipping Form     ${VALID CONTACT NUM}
    Input Barangay in Shipping Form         ${VALID BARANGAY}
    Input City in Shipping Form             ${VALID CITY} 
    Input Province in Shipping Form         ${VALID PROVINCE} 
    Submit Shipping Form
    Set Selenium Speed                      0.5
    Submit Order
    Checkout Should Have Failed (No Payment Method)
    Set Selenium Speed              ${DELAY}
    # Delete All Items in Cart

Unsuccessful Checkout (No Items in Cart)
    Go To Checkout
    Input Full Name in Shipping Form        ${VALID FULL NAME} 
    Input Contact Number in Shipping Form   ${VALID CONTACT NUM}
    Input Email Address in Shipping Form    ${VALID EMAIL} 
    Input House Number in Shipping Form     ${VALID CONTACT NUM}
    Input Barangay in Shipping Form         ${VALID BARANGAY}
    Input City in Shipping Form             ${VALID CITY} 
    Input Province in Shipping Form         ${VALID PROVINCE} 
    Submit Shipping Form
    Set Selenium Speed                      0.5
    Submit Order
    Checkout Should Have Failed (No Items in Cart)
    Set Selenium Speed              ${DELAY}
    # Delete All Items in Cart