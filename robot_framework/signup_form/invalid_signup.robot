*** Settings ***
Documentation      A test suite with a single test for an invalid sign up
...
...                This test has a workflow that is created using keywords
...                directly from SeleniumLibrary
Suite Setup        Open Browser to Home Page
Suite Teardown     Close Browser
Test Setup         Go to Sign Up Page
Resource           resource.robot

*** Test Cases *** 
Passwords Not Matching 
    Input Full Name in Create           ${VALID FULL NAME}
    Input Username in Create            ${VALID USERNAME}
    Input Email in Create               ${VALID EMAIL}
    Input Password in Create            ${VALID PASSWORD}
    Input Confirm Password in Create    ${MISMATCH PASSWORD}
    Click Register Button
    Failed Account Creation (Mismatch Password)

Duplicate Account (Username)
    Input Full Name in Create           ${VALID FULL NAME}
    Input Username in Create            ${EXISTING USERNAME}
    Input Email in Create               ${VALID EMAIL}
    Input Password in Create            ${VALID PASSWORD}
    Input Confirm Password in Create    ${VALID PASSWORD}
    Click Register Button
    Failed Account Creation (Existing Account)

Duplicate Account (Email)
    Input Full Name in Create           ${VALID FULL NAME}
    Input Username in Create            ${VALID USERNAME}
    Input Email in Create               ${EXISTING EMAIL}
    Input Password in Create            ${VALID PASSWORD}
    Input Confirm Password in Create    ${VALID PASSWORD}
    Click Register Button
    Failed Account Creation (Existing Account)
    
Missing All Credentials
    Click Register Button
    Failed Account Creation (Null Name)
    Failed Account Creation (Null Username)
    Failed Account Creation (Null Email)
    Failed Account Creation (Invalid Password)

Invalid Full Name (all numbers)
    Input Full Name in Create           ${INVALID NAME}
    Input Username in Create            ${VALID USERNAME}
    Input Email in Create               ${VALID EMAIL}
    Input Password in Create            ${VALID PASSWORD}
    Input Confirm Password in Create    ${VALID PASSWORD}
    Click Register Button
    Failed Account Creation (Invalid Name)

Invalid Full Name (all special char)
    Input Full Name in Create           ${INVALID NAME2}
    Input Username in Create            ${VALID USERNAME}
    Input Email in Create               ${VALID EMAIL}
    Input Password in Create            ${VALID PASSWORD}
    Input Confirm Password in Create    ${VALID PASSWORD}
    Click Register Button
    Failed Account Creation (Invalid Name)

Invalid Full Name (letters + numbers)
    Input Full Name in Create           ${INVALID NAME3}
    Input Username in Create            ${VALID USERNAME}
    Input Email in Create               ${VALID EMAIL}
    Input Password in Create            ${VALID PASSWORD}
    Input Confirm Password in Create    ${VALID PASSWORD}
    Click Register Button
    Failed Account Creation (Invalid Name)

Invalid Email (with numbers)
    Input Full Name in Create           ${VALID FULL NAME}
    Input Username in Create            ${VALID USERNAME}
    Input Email in Create               ${INVALID EMAIL}
    Input Password in Create            ${VALID PASSWORD}
    Input Confirm Password in Create    ${VALID PASSWORD}
    Click Register Button
    Failed Account Creation (Invalid Email)

Invalid Email (with special chars)
    Input Full Name in Create           ${VALID FULL NAME}
    Input Username in Create            ${VALID USERNAME}
    Input Email in Create               ${INVALID EMAIL2}
    Input Password in Create            ${VALID PASSWORD}
    Input Confirm Password in Create    ${VALID PASSWORD}
    Click Register Button
    Failed Account Creation (Invalid Email)

Invalid Email (wrong format)
    Input Full Name in Create           ${VALID FULL NAME}
    Input Username in Create            ${VALID USERNAME}
    Input Email in Create               ${INVALID EMAIL3}
    Input Password in Create            ${VALID PASSWORD}
    Input Confirm Password in Create    ${VALID PASSWORD}
    Click Register Button
    Failed Account Creation (Invalid Email)

Invalid Password (less than 8)
    Input Full Name in Create           ${VALID FULL NAME}
    Input Username in Create            ${VALID USERNAME}
    Input Email in Create               ${VALID EMAIL}
    Input Password in Create            ${INVALID PASSWORD}
    Input Confirm Password in Create    ${VALID PASSWORD}
    Click Register Button
    Failed Account Creation (Invalid Password)

Missing Full Name
    Input Full Name in Create           ${NULL NAME}
    Input Username in Create            ${VALID USERNAME}
    Input Email in Create               ${VALID EMAIL}
    Input Password in Create            ${VALID PASSWORD}
    Input Confirm Password in Create    ${VALID PASSWORD}
    Click Register Button
    Failed Account Creation (Null Name)

Missing Username
    Input Full Name in Create           ${VALID FULL NAME}
    Input Username in Create            ${NULL USERNAME}
    Input Email in Create               ${VALID EMAIL}
    Input Password in Create            ${VALID PASSWORD}
    Input Confirm Password in Create    ${VALID PASSWORD}
    Click Register Button
    Failed Account Creation (Null Username)

Missing Email
    Input Full Name in Create           ${VALID FULL NAME}
    Input Username in Create            ${VALID USERNAME}
    Input Email in Create               ${NULL EMAIL}
    Input Password in Create            ${VALID PASSWORD}
    Input Confirm Password in Create    ${VALID PASSWORD}
    Click Register Button
    Failed Account Creation (Null Email)

Missing Password
    Input Full Name in Create           ${VALID FULL NAME}
    Input Username in Create            ${VALID USERNAME}
    Input Email in Create               ${VALID EMAIL}
    Input Password in Create            ${NULL PASSWORD}
    Input Confirm Password in Create    ${VALID PASSWORD}
    Click Register Button
    Failed Account Creation (Invalid Password)

Missing Confirm Password
    Input Full Name in Create           ${VALID FULL NAME}
    Input Username in Create            ${VALID USERNAME}
    Input Email in Create               ${VALID EMAIL}
    Input Password in Create            ${VALID PASSWORD}
    Input Confirm Password in Create    ${NULL PASSWORD}
    Click Register Button
    Failed Account Creation (Invalid CPassword)

Combo Errors
    Input Full Name in Create           ${NULL NAME}
    Input Username in Create            ${VALID USERNAME}
    Input Email in Create               ${INVALID EMAIL}
    Input Password in Create            ${INVALID PASSWORD}
    Input Confirm Password in Create    ${VALID PASSWORD}
    Click Register Button
    Failed Account Creation (Null Name)
    Failed Account Creation (Invalid Email)
    Failed Account Creation (Invalid Password)
    Failed Account Creation (Mismatch Password)