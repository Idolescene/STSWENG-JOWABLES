$(document).ready(function () {
    $("#gcash-btn").click(function () {
      $("#payment-shipping").val("GCash");
      $(this).addClass("btn-outline-primary");
      $("#cod-btn").removeClass("btn-outline-primary");
      $("#bank-btn").removeClass("btn-outline-primary");
    });

    $("#cod-btn").click(function () {
      $("#payment-shipping").val("COD");
      $(this).addClass("btn-outline-primary");
      $("#gcash-btn").removeClass("btn-outline-primary");
      $("#bank-btn").removeClass("btn-outline-primary");
    });

    $("#bank-btn").click(function () {
      $("#payment-shipping").val("Bank Transfer");
      $(this).addClass("btn-outline-primary");
      $("#cod-btn").removeClass("btn-outline-primary");
      $("#gcash-btn").removeClass("btn-outline-primary");
    });
});
