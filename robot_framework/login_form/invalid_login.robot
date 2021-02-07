*** Settings ***
Documentation      A test suite with a single test for an invalid login
...
...                This test has a workflow that is created using keywords
...                directly from SeleniumLibrary
Suite Setup        Open Browser to Home Page
Suite Teardown     Close Browser
Test Setup         Go to Login Page
Resource           resource.robot

*** Test Cases ***
Wrong Password Login
    Input Email in Login                    ${VALID EMAIL}
    Input Password in Login                 ${WRONG PASSWORD}
    Click Login Button
    Login Should Have Failed (Wrong Password)

Unregistered Login
    Input Email in Login                    ${RANDOM EMAIL}
    Input Password in Login                 ${VALID PASSWORD}
    Click Login Button
    Login Should Have Failed (Unregistered User)

Missing Both Credentials Login
    Input Email in Login                    ${NULL EMAIL}
    Input Password in Login                 ${NULL PASSWORD}
    Click Login Button
    Login Should Have Failed (Null Password & Email)

Missing Email Login
    Input Email in Login                    ${NULL EMAIL}
    Input Password in Login                 ${VALID PASSWORD}
    Click Login Button
    Login Should Have Failed (Null Email)

Missing Password Login
    Input Email in Login                    ${VALID EMAIL}
    Input Password in Login                 ${NULL PASSWORD}
    Click Login Button
    Login Should Have Failed (Null Password)
