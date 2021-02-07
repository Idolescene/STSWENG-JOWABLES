*** Settings ***
Documentation      A test suite with a single test for a valid sign up
...
...                This test has a workflow that is created using keywords
...                directly from SeleniumLibrary        
Resource           resource.robot

*** Test Cases *** 
Create A New Account
    Open Browser to Home Page
    Go to Sign Up Page
    Input Full Name in Create           ${VALID FULL NAME}
    Input Username in Create            ${VALID USERNAME}
    Input Email in Create               ${VALID EMAIL}
    Input Password in Create            ${VALID PASSWORD}
    Input Confirm Password in Create    ${VALID PASSWORD}
    Click Register Button
    Account Created Successfully
    Input Email in Login                ${VALID EMAIL}
    Input Password in Login             ${VALID PASSWORD}
    Click Login Button
    Location Should Be                  ${MAIN URL}
    Go To Profile
    Close Browser