$(document).ready(function () {
    $(".summselect").change(function () {
        var order = {
          status: $(this).val(),
          id: $(this).attr("id")
        };

        $.post("update-order-status", {neworder: order}, function(data, status){
            window.location.reload();
        });
    });

    $(".cancel-btn").click(function () {
        var order = {
          status: "Cancelled",
          id: $(this).attr("orderid")
        };

        $.post("update-order-status", {neworder: order}, function(data, status){
            window.location.reload();
        });
    });
});
