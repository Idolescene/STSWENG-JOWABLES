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
Successful Edit Username


Successful Edit Password
    
    