*** Settings ***
Documentation      A test suite for signup
...
...                This test has a workflow that is created using keywords
...                directly from SeleniumLibrary
Library            SeleniumLibrary

*** Variables ***
${SERVER}                salawalco.herokuapp.com
${BROWSER}               Chrome
${DELAY}                 0

${VALID FULL NAME}       Jennie Ruby Jane
${VALID USERNAME}        JennieRuby
${VALID EMAIL}           blackpink@gmail.com
${VALID PASSWORD}        ILoveRose
${MISMATCH PASSWORD}     ImNayeon
${INVALID PASSWORD}      1234 

${INVALID NAME}          12345 67892
${INVALID NAME2}         !@#$% $%#$
${INVALID NAME3}         Jennie 1234

${INVALID EMAIL}         123456
${INVALID EMAIL2}        $%^&
${INVALID EMAIL3}        Jennie@Lim@yahoo.com

${EXISTING EMAIL}        sammy@gmail.com
${EXISTING USERNAME}     sammygo
${EXISTING PASSWORD}     Salawal123

${NULL NAME}
${NULL USERNAME}
${NULL EMAIL}
${NULL PASSWORD}

${MAIN URL}              https://${SERVER}/
${PROFILE URL}           https://${SERVER}/profile


*** Keywords ***
Open Browser to Home Page
    Open Browser                    ${MAIN URL}        ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed              ${DELAY}
    Page Should Contain Element     class:masthead-banner

Go to Sign Up Page
    Click Profile Icon
    Sign Up Page Should Be Open

Sign Up Page Should Be Open
    Page Should Contain Element     id:regbtn

Input Email in Login
    [Arguments]        ${email}
    Input Text                      id:logemail           ${email}

Input Password in Login
    [Arguments]        ${password}
    Input Text                     id:logpass             ${password}

Click Login Button
    Click Button                    id:logbtn

Go To Profile
    Click Profile Icon
    Location Should Be              ${PROFILE URL}
    User Profile Should Be Accessible

User Profile Should Be Accessible
    Page Should Contain Element     class:profile-edit

Input Full Name in Create
    [Arguments]        ${name}
    Input Text                      id:regfn              ${name}

Input Username in Create
    [Arguments]        ${username}
    Input Text                      id:regun          ${username}

Input Email in Create
    [Arguments]        ${email}
    Input Text                      id:regemail          ${email}

Input Password in Create
    [Arguments]        ${password}
    Input Text                     id:regpass           ${password}

Input Confirm Password in Create
    [Arguments]        ${cpassword}
    Input Text                     id:regcpass            ${cpassword}

Click Register Button
    Click Button                    id:regbtn

Click Profile Icon
    Click Element                   id:proficon
    
Account Created Successfully
    Element Text Should Be          id=success-div                Success: Registration successful! Please login.

Failed Account Creation (Existing Account)
    Element Should Contain          id=error-msg                  User already exists.

Failed Account Creation (Null Name)
    Element Should Contain           id=error-msg                  Full Name is required.

Failed Account Creation (Null Username)
    Element Should Contain           id=error-msg                  Username is required.

Failed Account Creation (Null Email)
    Element Should Contain           id=error-msg                  Email is required.

Failed Account Creation (Invalid Name)
    Element Should Contain           id=error-msg                  Name should only contain letters, periods and spaces.

Failed Account Creation (Invalid Email)
    Element Should Contain           id=error-msg                  Please provide a valid email

Failed Account Creation (Invalid Password)
    Element Should Contain           id=error-msg                  Password needs to be at least 8 characters long

Failed Account Creation (Invalid CPassword)
    Element Should Contain           id=error-msg                  Confirm password needs to be at least 8 characters long

Failed Account Creation (Mismatch Password)
    Element Should Contain           id=error-msg                  Passwords need to match.



