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
    });
