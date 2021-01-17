$(document).ready(function () {
    $("#shiprows").hide();
    $(".orderrows").hide();
    $(".profile-id").click(function () {
        var name =  $(this).text();

        window.location.href = "order-information-" + name;
    });
});
