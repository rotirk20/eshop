jQuery( document ).ready(function() {
    jQuery(".custom-select").change(function () {
        var abc = jQuery('option:selected',this).text();
        if (abc === "Computers")
       {
        jQuery('#display').hide();
        var display = jQuery('input[name="display"]').val(null).change();
       }
       else {
        jQuery('#display').show();
       }
       
    });

    jQuery('.example').on('change', function() {
      jQuery('.example').not(this).prop('checked', false);  
  });
  
    });




      // Look for .hamburger
  var hamburger = document.querySelector(".hamburger");
  // On click
  hamburger.addEventListener("click", function() {
    // Toggle class "is-active"
    hamburger.classList.toggle("is-active");
    // Do something else, like open/close menu
  });