*** Settings ***
Documentation      A test suite with a single test for a invalid editing of shipping details in checkout
...
...                This test has a workflow that is created using keywords
...                directly from SeleniumLibrary
Suite Setup        Login Successfully and Add Products to the Cart
Suite Teardown     Close Browser
Test Setup         Go To Checkout
Resource           resource.robot

*** Test Cases ***