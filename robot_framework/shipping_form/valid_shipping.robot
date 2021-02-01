*** Settings ***
Documentation      A test suite with a single test for a valid editing of shipping details in checkout
...
...                This test has a workflow that is created using keywords
...                directly from SeleniumLibrary
Suite Setup        Login Successfully and Add Products to the Cart
Suite Teardown     Close Browser
# Test Setup         Go To Checkout
Resource           resource.robot

*** Test Cases ***
Successful Edit Shipping
    Go To                           https://salawalco.herokuapp.com/product_details/black-shorter-shorts
    Click Button                   id:small
    Click Button                   id:btnPressed
    Go To                           https://salawalco.herokuapp.com/checkout
    Click Link                    class:checkStock
    Click Button                    id:gcash-btn
    Click Button                    id:ship-btn
    
    