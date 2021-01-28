*** Settings ***
Documentation      A test suite with a single test for a Invalid editing of profile
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
    Set Selenium Speed                   0.5 
    Input Email in Edit Profile          ${INVALID EMAIL} 
    Set Selenium Speed                     0
    Submit New Email
    Edit Should Have Failed (Invalid Email)

Edit Invalid Password Should Fail
    Edit Profile
    Set Selenium Speed                   0.5 
    Input Password in Edit Profile       ${INVALID PASSWORD} 
    Set Selenium Speed                     0
    Submit New Password
    Edit Should Have Failed (Invalid or Null Password)

Edit Null Email Should Fail
    Edit Profile
    Set Selenium Speed                   0.5 
    Input Email in Edit Profile          ${NULL EMAIL} 
    Set Selenium Speed                     0
    Submit New Email
    Edit Should Have Failed (Null Email)

Edit Null Password Should Fail
    Edit Profile
    Set Selenium Speed                   0.5 
    Input Password in Edit Profile       ${NULL PASSWORD} 
    Set Selenium Speed                     0
    Submit New Password
    Edit Should Have Failed (Invalid or Null Password)
    
Edit Valid Password But Not Matched With Confirm Password Should Fail
    Edit Profile
    Set Selenium Speed                   0.5 
    Input Password in Edit Profile       ${VALID PASSWORD} 
    Set Selenium Speed                     0
    Input Different Confirm Password in Edit Profile    ${NULL PASSWORD} 
    Submit New Password
    Edit Should Have Failed (Not Matching Password)
    
Edit Shipping Details Should Fail (Invalid Full Name)
    Edit Shipping Details
    Input Full Name in Shipping Details        ${INVALID FULL NAME}
    Submit New Shipping Details
    Edit Shipping Details Should Have Failed (Invalid Full Name)

Edit Shipping Details Should Fail (Null Full Name)
    Edit Shipping Details
    Input Full Name in Shipping Details        ${NULL FULL NAME}
    Submit New Shipping Details
    Edit Shipping Details Should Have Failed (Null Full Name)

Edit Shipping Details Should Fail (Invalid Contact Number)
    Edit Shipping Details
    Input Contact Number in Shipping Details        ${INVALID CONTACT NUM}
    Submit New Shipping Details
    Edit Shipping Details Should Have Failed (Invalid Contact Number)

Edit Shipping Details Should Fail (Null Contact Number)
    Edit Shipping Details
    Input Contact Number in Shipping Details        ${NULL CONTACT NUM}
    Submit New Shipping Details
    Edit Shipping Details Should Have Failed (Null Contact Number)

Edit Shipping Details Should Fail (Invalid House Number)
    Edit Shipping Details
    Input House Number in Shipping Details        ${INVALID HOUSE NUM}
    Submit New Shipping Details
    Edit Shipping Details Should Have Failed (Invalid House Number)

Edit Shipping Details Should Fail (Null House Number)
    Edit Shipping Details
    Input House Number in Shipping Details        ${NULL HOUSE NUM}
    Submit New Shipping Details
    Edit Shipping Details Should Have Failed (Null House Number)

Edit Shipping Details Should Fail (Invalid Barangay)
    Edit Shipping Details
    Input Barangay in Shipping Details        ${INVALID BARANGAY}
    Submit New Shipping Details
    Edit Shipping Details Should Have Failed (Invalid Barangay)

Edit Shipping Details Should Fail (Null Barangay)
    Edit Shipping Details
    Input Barangay in Shipping Details        ${NULL BARANGAY}
    Submit New Shipping Details
    Edit Shipping Details Should Have Failed (Null Barangay)

Edit Shipping Details Should Fail (Invalid City)
    Edit Shipping Details
    Input City in Shipping Details        ${INVALID CITY}
    Submit New Shipping Details
    Edit Shipping Details Should Have Failed (Invalid City)

Edit Shipping Details Should Fail (Null City)
    Edit Shipping Details
    Input City in Shipping Details        ${NULL CITY}
    Submit New Shipping Details
    Edit Shipping Details Should Have Failed (Null City)

Edit Shipping Details Should Fail (Invalid Province)
    Edit Shipping Details
    Input Province in Shipping Details        ${INVALID PROVINCE}
    Submit New Shipping Details
    Edit Shipping Details Should Have Failed (Invalid Province)

Edit Shipping Details Should Fail (Null Province)
    Edit Shipping Details
    Input Province in Shipping Details        ${NULL PROVINCE}
    Submit New Shipping Details
    Edit Shipping Details Should Have Failed (Null Province)