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
${ORIGINAL FULL NAME}    Sophia See
${VALID FULL NAME}       Sophia Somethin See
${INVALID FULL NAME}     1110 0100 1111 
${NULL FULL NAME}
${ORIGINAL CONTACT NUM}  09123456789
${VALID CONTACT NUM}     09123456780
${INVALID CONTACT NUM}   123131
${NULL CONTACT NUM}
${ORIGINAL HOUSE NUM}    House #9, Building A, Streeters
${VALID HOUSE NUM}       Unit 4A, Building C, Lolo Street
${INVALID HOUSE NUM}     %$@#$%@$
${NULL HOUSE NUM}        
${ORIGINAL BARANGAY}     Barangay A
${VALID BARANGAY}        Barangay 112
${INVALID BARANGAY}      %$@#$
${NULL BARANGAY}
${ORIGINAL CITY}         Manila
${VALID CITY}            Quezon City
${INVALID CITY}          !#!$$@#
${NULL CITY}
${ORIGINAL PROVINCE}     Metro Manila
${VALID PROVINCE}        Tagaytay
${INVALID PROVINCE}      !@#!@##!

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
    Input Email in Login                     ${ORIGINAL EMAIL}
    Input Password in Login                  ${ORIGINAL PASSWORD}
    Click Login Button
    Location Should Be                       ${MAIN URL}
    
User Profile Should Be Accessible
    Page Should Contain Element     class:profile-edit

Go To Profile
    Click Profile Icon
    Location Should Be              ${LOGIN URL}
    User Profile Should Be Accessible

Input Email in Login
    [Arguments]        ${email}
    Input Text                      id:logemail           ${email}

Input Password in Login
    [Arguments]        ${password}
    Input Text                     id:logpass             ${password}

Input Email in Edit Profile
    [Arguments]        ${email}
    Input Text                      id:editemail          ${email}

Input Password in Edit Profile
    [Arguments]        ${password}
    Input Text                      id:editpassword       ${password}
    Input Text                      id:cpassword          ${password}

Input Full Name in Shipping Details
    [Arguments]        ${fullname}
    Input Text                      id:fullname           ${fullname}

Input Contact Number in Shipping Details
    [Arguments]        ${contactnum}
    Input Text                      id:contno             ${contactnum}

Input House Number in Shipping Details
    [Arguments]        ${housenum}
    Input Text                      id:houseno             ${housenum}

Input Barangay in Shipping Details
    [Arguments]        ${barangay}
    Input Text                      id:brngy             ${barangay}

Input City in Shipping Details
    [Arguments]        ${city}
    Input Text                      id:city             ${city}

Input Province in Shipping Details
    [Arguments]        ${province}
    Input Text                      id:prov             ${province}

Click Login Button
    Click Button                    id:logbtn


Click Profile Icon
    Click Element                   id:proficon

Edit Profile    
    Click Button                    class:profile-edit

Edit Shipping Details
    Click Element                    id:shipbutton

Submit New email
    Click Button                    id:email-save-btn

Submit New Password
    Click Button                    id:pass-save-btn

Submit New Shipping Details
    Click Button                    id:shipsubmit

Edited Successfully (Valid Email)
    Element Text Should Be          id=success-div                Success: Email updated successfully!

Edit Should Have Failed (Invalid Email)
    Element Text Should Be          id=error-div                  Error: Please provide a valid email.

Edit Should Have Failed (Null Email)
    Element Text Should Be          id=error-div                  Error: Email is required. Please provide a valid email.


Edited Successfully (Valid Password)
    Element Text Should Be          id=success-div                Success: Password updated successfully!

Edit Should Have Failed (Invalid or Null Password)
    Element Text Should Be          id=error-div                  Error: Password needs to be at least 8 characters long. Confirm password needs to be at least 8 characters long.


Edited Shipping Details Successfully
    Element Text Should Be          id=success-div                  Success: Shipping details updated successfully!