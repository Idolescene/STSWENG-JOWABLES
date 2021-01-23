*** Settings ***
Documentation      A test suite with a single test for a invalid shipping
...
...                This test has a workflow that is created using keywords
...                directly from SeleniumLibrary
Library            SeleniumLibrary

*** Variables ***
${SERVER}            salawalco.herokuapp.com
${BROWSER}           Chrome
${DELAY}             0
${VALID USER}        sophiasee@gmail.com
${VALID PASSWORD}    12345678
${MAIN URL}          https://${SERVER}/
${LOGIN URL}         https://${SERVER}/profile
${CHECKOUT URL}      https://${SERVER}/checkout


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
    Input Username                  ${VALID USER}
    Input Password                  ${VALID PASSWORD}
    Click Login Button
    Location Should Be              ${MAIN URL}
    User Profile Should Be Accessible

User Profile Should Be Accessible
    Page Should Contain Element     class:profile-edit

Go To Profile
    Click Profile Icon
    Location Should Be              ${LOGIN URL}
    User Profile Should Be Accessible

Input Username
    [Arguments]        ${username}
    Input Text                      logemail        ${username}

Input Password
    [Arguments]        ${password}
    Input Text                      logpass        ${password}

Click Login Button
    Click Button                    id:logbtn

Click Profile Icon
    Click Element                    id:proficon

Go to Checkout
    Click Cart Button
    Click Checkout Button
    Checkout Page Should Be Open

Click Cart Button
    Click Element                    class:dropdown

Click Checkout Button
    Click Element                    link:Edit Cart

Checkout Page Should Be Open
    Location Should Be                ${CHECKOUT URL}
    Page Should Contain Element        link:Order