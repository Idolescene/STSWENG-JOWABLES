*** Settings ***
Documentation      A test suite with a single test for a INvalid editing of profile
...
...                This test has a workflow that is created using keywords
...                directly from SeleniumLibrary
Suite Setup        Login Successfully
Suite Teardown     Close Browser
Test Setup         Go To Profile
Resource           resource.robot

*** Test Cases ***
Edit Invalid Email Should Fail
    Edit Profile
    Input Email in Edit Profile          ${INVALID EMAIL} 
    Submit New Email
    Edit Should Have Failed (Invalid Email)

Edit Invalid Password Should Fail
    Edit Profile
    Input Password in Edit Profile       ${INVALID PASSWORD} 
    Submit New Password
    Edit Should Have Failed (Invalid or Null Password)

Edit Null Email Should Fail
    Edit Profile
    Input Email in Edit Profile          ${NULL EMAIL} 
    Submit New Email
    Edit Should Have Failed (Null Email)

Edit Null Password Should Fail
    Edit Profile
    Input Password in Edit Profile       ${NULL PASSWORD} 
    Submit New Password
    Edit Should Have Failed (Invalid or Null Password)
    