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

Input Email in Edit Profile
    [Arguments]        ${email}
    Input Text                      id:editemail           ${email}

Input Password in Edit Profile
    [Arguments]        ${password}
    Input Text                      id:editpassword        ${password}

Click Login Button
    Click Button                    id:logbtn


Click Profile Icon
    Click Element                   id:proficon

Edit Profile    
    Click Button                    class:profile-edit

Submit New email
    Click Button

Submit New Password
    Click Button


Edited Successfully (Valid Email)
    Element Text Should Be          id=success-msg                Success: Email updated successfully!

Edit Should Have Failed (Invalid Email)
    Element Text Should Be          id=error-msg                  Error: Please provide a valid email.

Edit Should Have Failed (Null Email)
    Element Text Should Be          id=error-msg                  Error: Email is required. Please provide a valid email.


Edited Successfully (Valid Password)
    Element Text Should Be          id=success-msg                Success: Password updated successfully!

Edit Should Have Failed (Invalid or Null Password)
    Element Text Should Be          id=error-msg                  Error: Password needs to be at least 8 characters long. Confirm password needs to be at least 8 characters long.