*** Settings ***
Documentation      A test suite for login
...
...                This test has a workflow that is created using keywords
...                directly from SeleniumLibrary
Library            SeleniumLibrary

*** Variables ***
${SERVER}                salawalco.herokuapp.com
${BROWSER}               Chrome
${DELAY}                 0
${VALID EMAIL}           sammy@gmail.com
${VALID USERNAME}        sammygo
${VALID PASSWORD}        Salawal123
${WRONG PASSWORD}        ImWrong123
${RANDOM EMAIL}          chinnycha@yahoo.com
${NULL EMAIL}
${NULL PASSWORD}
${MAIN URL}              https://${SERVER}/


*** Keywords ***
Open Browser to Home Page
    Open Browser                    ${MAIN URL}        ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed              ${DELAY}
    Page Should Contain Element     class:masthead-banner

Go to Login Page
    Click Profile Icon
    Login Page Should Be Open

Login Page Should Be Open
    Page Should Contain Element     id:logbtn

Input Email in Login
    [Arguments]        ${email}
    Input Text                      id:logemail           ${email}

Input Password in Login
    [Arguments]        ${password}
    Input Text                     id:logpass             ${password}

Click Login Button
    Click Button                    id:logbtn

Click Profile Icon
    Click Element                   id:proficon

Login Should Have Failed (Unregistered User)
    Element Text Should Be          id=error-msg                  Error: User not found. Please try again.

Login Should Have Failed (Wrong Password)
    Element Text Should Be          id=error-msg                  Error: Incorrect password. Please try again.

Login Should Have Failed (Null Email)
    Element Text Should Be          id=error-msg                  Error: Username/Email is required.

Login Should Have Failed (Null Password)
    Element Text Should Be          id=error-msg                  Error: Password is required.

Login Should Have Failed (Null Password & Email)
    Element Text Should Be          id=error-msg                  Error: Username/Email is required. Password is required.

