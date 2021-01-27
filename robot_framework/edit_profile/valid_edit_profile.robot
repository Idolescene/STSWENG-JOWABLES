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
    Set Selenium Speed                   0.5 
    Input Email in Edit Profile          ${VALID EMAIL}
    Set Selenium Speed                     0
    Submit New Email
    Edited Successfully (Valid Email)

Edit Valid Password Should Be Successful
    Edit Profile
    Set Selenium Speed                   0.5 
    Input Password in Edit Profile       ${VALID PASSWORD} 
    Set Selenium Speed                     0
    Submit New Password
    Edited Successfully (Valid Password)

Revert to Original Email Should Be Successful
    Edit Profile
    Set Selenium Speed                   0.5 
    Input Email in Edit Profile          ${ORIGINAL EMAIL} 
    Set Selenium Speed                     0
    Submit New Email
    Edited Successfully (Valid Email)

Revert to Original Password Should Be Successful
    Edit Profile
    Set Selenium Speed                   0.5 
    Input Password in Edit Profile       ${ORIGINAL PASSWORD}
    Set Selenium Speed                     0
    Submit New Password
    Edited Successfully (Valid Password)
    
Edit Shipping Details Should Be Successful (New Full Name)
    Edit Shipping Details
    Input Full Name in Shipping Details        ${VALID FULL NAME}
    Submit New Shipping Details
    Edited Shipping Details Successfully

Edit Shipping Details Should Be Successful (Original Full Name)
    Edit Shipping Details
    Input Full Name in Shipping Details        ${ORIGINAL FULL NAME}
    Submit New Shipping Details
    Edited Shipping Details Successfully

Edit Shipping Details Should Be Successful (New Contact Number)
    Edit Shipping Details
    Input Contact Number in Shipping Details        ${VALID CONTACT NUM}
    Submit New Shipping Details
    Edited Shipping Details Successfully

Edit Shipping Details Should Be Successful (Original Contact Number)
    Edit Shipping Details
    Input Contact Number in Shipping Details        ${ORIGINAL CONTACT NUM}
    Submit New Shipping Details
    Edited Shipping Details Successfully

Edit Shipping Details Should Be Successful (New House Number)
    Edit Shipping Details
    Input House Number in Shipping Details        ${VALID HOUSE NUM}
    Submit New Shipping Details
    Edited Shipping Details Successfully

Edit Shipping Details Should Be Successful (Original House Number)
    Edit Shipping Details
    Input House Number in Shipping Details        ${ORIGINAL HOUSE NUM}
    Submit New Shipping Details
    Edited Shipping Details Successfully

Edit Shipping Details Should Be Successful (New Barangay)
    Edit Shipping Details
    Input Barangay in Shipping Details        ${VALID BARANGAY}
    Submit New Shipping Details
    Edited Shipping Details Successfully

Edit Shipping Details Should Be Successful (Original Barangay)
    Edit Shipping Details
    Input Barangay in Shipping Details        ${ORIGINAL BARANGAY}
    Submit New Shipping Details
    Edited Shipping Details Successfully

Edit Shipping Details Should Be Successful (New City)
    Edit Shipping Details
    Input City in Shipping Details        ${VALID CITY}
    Submit New Shipping Details
    Edited Shipping Details Successfully

Edit Shipping Details Should Be Successful (Original City)
    Edit Shipping Details
    Input City in Shipping Details        ${ORIGINAL CITY}
    Submit New Shipping Details
    Edited Shipping Details Successfully

Edit Shipping Details Should Be Successful (New Province)
    Edit Shipping Details
    Input Province in Shipping Details        ${VALID PROVINCE}
    Submit New Shipping Details
    Edited Shipping Details Successfully

Edit Shipping Details Should Be Successful (Original Province)
    Edit Shipping Details
    Input Province in Shipping Details        ${ORIGINAL PROVINCE}
    Submit New Shipping Details
    Edited Shipping Details Successfully