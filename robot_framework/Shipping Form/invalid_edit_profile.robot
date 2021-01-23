*** Settings ***
Documentation      A test suite with a single test for a invalid shipping
...
...                This test has a workflow that is created using keywords
...                directly from SeleniumLibrary
Suite Setup        Open Browser To Login Page
Suite Teardown     Close Browser
Test Setup         Go To Login Page
Test Template      Login With Invalid Credentials Should Fail
Resource           resource.robot

*** Test Cases ***
Unsuccessful Shipping (Somethin)
    Open Browser to Login Page
    Input Username                  locked_out_user
    Input Password                         secret_sauce
    Click Login Button
    Login Page Should Be Open
    Element Text Should Be          css:*[data-test="error"]         Epic sadface: Sorry, this user has been locked out.
    [Teardown]                      Close Browser

Unsuccessful Shipping (Invalid Password)
    Open Browser to Login Page
    Input Username                        standard_user
    Input Password                         secret_sauce1
    Click Login Button
    Login Page Should Be Open
    Element Text Should Be          css:*[data-test="error"]         Epic sadface: Username and password do not match any user in this service
    [Teardown]                      Close Browser