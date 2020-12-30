$(document).ready(function () {
    $("#reg-btn").click(() =>  {
        var accntfname = $("#reg-fn").val();
        var accntuname = $("#reg-un").val();
        var accntpass = $("#reg-pass").val();
        var accntpass2 = $("#reg-cpass").val();
        var accntemail = $("#reg-email").val();
        var newuser = {
            fullname: accntfname,
            username: accntuname,
            email: accntemail,
            password: accntpass
        }

        if (accntfname == "" || accntpass == "" || accntuname=="" || accntpass=="" || accntpass2=="" || accntemail=="")
        {
            alert("Invalid Registration. One or more fields are blank.");
            return false;
        }
        else if (accntpass!=accntpass2)
        {
            alert("Invalid Registration. Passwords do not match.");
            return false;
        }
        else
        {
            $.post('searchUserEmail', {user: newuser}, (data, status) => {
                if(!data.ok) {
                  $.post('searchUserName', {user: newuser}, (data, status) => {
                      if(!data.ok) {
                          alert("Registration Successful!")
                          $.post("createNewUser", newuser, (data, status) => {

                          });
                      } else {
                        alert("Username already in use.");
                      }
                  });
                } else {
                  alert("Email already in use.");
                }
            });
        }
    });

    $("#log-btn").click(() => {
        var accntemail = $("#log-email").val();
        var accntpass = $("#log-pass").val();
        var newuser = {
            email:accntemail,
            password:accntpass
        }
        if (accntemail == "" || accntpass == "")
        {
            alert("Fields are not filled up.");
            return false;
        }
        else
        {
          $.post('loginUserEmail', {user: newuser},(data, status) => {
              if(!data.ok) {
                $.post('loginUserName', {user: newuser},(data, status) => {
                    if(!data.ok) {
                      alert("Invalid Login.");
                    } else {
                      $(location).attr("href", "/");
                      alert("Welcome!");
                    }
                });
              } else {
                $(location).attr("href", "/");
                alert("Welcome!");
              }
          });
        }
    });
});
