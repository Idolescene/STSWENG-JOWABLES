*** Settings ***
Documentation      A test suite with a single test for a valid login
...
...                This test has a workflow that is created using keywords
...                directly from SeleniumLibrary
Resource           resource.robot

*** Test Cases ***
Valid Login with Email
    Open Browser to Home Page
    Go to Login Page
    Input Email in Login                    ${VALID EMAIL}
    Input Password in Login                 ${VALID PASSWORD}
    Click Login Button
    Location Should Be                      ${MAIN URL}
    Close Browser

Valid Login with Username
    Open Browser to Home Page
    Go to Login Page
    Input Email in Login                    ${VALID USERNAME}
    Input Password in Login                 ${VALID PASSWORD}
    Click Login Button
    Location Should Be                      ${MAIN URL}
    Close Browser