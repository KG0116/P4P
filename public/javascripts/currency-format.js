
jQuery(document).ready(function($) {
    $('[id=price]').each(function(){
    	$(this).text("$" + parseFloat($(this).text()).toFixed(2));
    });
    console.log("altered again");
});

