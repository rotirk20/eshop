jQuery(document).ready(function () {
  jQuery(".custom-select").change(function () {
    var abc = jQuery('option:selected', this).text();
    if (abc === "Computers") {
      jQuery('#display').hide();
      var display = jQuery('input[name="display"]').val(null).change();
      jQuery('#gpu').show();
    }
    else {
      jQuery('#display').show();
      jQuery('#gpu').hide();
      var graphic = jQuery('input[name="gpu"]').val(null).change();
    }

  });





// Look for .hamburger
var hamburger = document.querySelector(".hamburger");
// On click
hamburger.addEventListener("click", function () {
  // Toggle class "is-active"
  hamburger.classList.toggle("is-active");
  // Do something else, like open/close menu
});

});