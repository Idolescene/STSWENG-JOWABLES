*** Settings ***
Documentation      A test suite with a single test for a valid shipping details in checkout
...
...                This test has a workflow that is created using keywords
...                directly from SeleniumLibrary
Suite Setup        Login Successfully
Suite Teardown     Close Browser
# Test Setup         Go To Checkout
Resource           resource.robot

*** Test Cases ***
Successful Checkout
    Add Products To Cart
    Go To Checkout
    Input Full Name in Shipping Form        ${VALID FULL NAME} 
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
    Set Selenium Speed              ${DELAY}
    Checkout Should Be Successful