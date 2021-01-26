*** Settings ***
Documentation      A test suite with a single test for a valid editing of profile
...
...                This test has a workflow that is created using keywords
...                directly from SeleniumLibrary
Suite Setup        Login Successfully
Suite Teardown     Close Browser
Test Setup         Go To Profile
Resource           resource.robot

*** Test Cases *** 
Edit Valid Email Should Be Successful
    Edit Profile
    Input Email in Edit Profile          ${VALID EMAIL} 
    Submit New Email
    Edited Successfully (Valid Email)

Edit Valid Password Should Be Successful
    Edit Profile
    Input Password in Edit Profile       ${VALID PASSWORD} 
    Submit New Password
    Edited Successfully (Valid Password)

Revert to Original Email Should Be Successful
    Edit Profile
    Input Email in Edit Profile          ${ORIGINAL EMAIL} 
    Submit New Email
    Edited Successfully (Valid Email)

Revert to Original Password Should Be Successful
    Edit Profile
    Input Password in Edit Profile       ${ORIGINAL PASSWORD} 
    Submit New Password
    Edited Successfully (Valid Password)
    