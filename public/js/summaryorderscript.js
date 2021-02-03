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

    $("#search-date-btn").click(function () {
        var dateto = $("#to-date-range").val().replace(/-/g, 'd');
        var datefrom = $("#from-date-range").val().replace(/-/g, 'd');
        var link = "/admin/summary-of-all-orders-" + datefrom + "-" + dateto;
        if (dateto == "" || datefrom == "")
          alert ("Please select start and end dates.");
        else
          window.location.href = link;
    });
});
