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

  var btn = jQuery('#button');

  jQuery(window).scroll(function() {
    if (jQuery(window).scrollTop() > 100) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });
  btn.on('click', function(e) {
    e.preventDefault();
    jQuery('html, body').animate({scrollTop:0}, '300');
  });

  

  if (jQuery("#note").val() === '') {
    jQuery("#note").val('No notes');
    console.log(jQuery("#note").val());
  }
  
  
  

// Look for .hamburger
var hamburger = document.querySelector(".hamburger");
// On click
hamburger.addEventListener("click", function () {
  // Toggle class "is-active"
  hamburger.classList.toggle("is-active");
  // Do something else, like open/close menu
});

});