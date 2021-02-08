$(document).ready(function () {
  $("label").css("font-weight", "bold");
  if ($("#sm-lb").attr("stock") == "0") {
    $("#sm-lb").css("color", "#4950579F");
    $("#sm-lb").css("font-weight", "normal");
  }
  if ($("#md-lb").attr("stock") == "0") {
    $("#md-lb").css("color", "#4950579F");
    $("#md-lb").css("font-weight", "normal");
  }
  if ($("#lg-lb").attr("stock") == "0") {
    $("#lg-lb").css("color", "#4950579F");
    $("#lg-lb").css("font-weight", "normal");
  }
  if ($("#xl-lb").attr("stock") == "0") {
    $("#xl-lb").css("color", "#4950579F");
    $("#xl-lb").css("font-weight", "normal");
  }
});
