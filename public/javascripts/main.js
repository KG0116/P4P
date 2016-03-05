(function($, d, w){
	var Main = {};
    var menu = $(".menu > div");
    var nav  = $("nav");

	function setPriceCurrencySymbol($element){
		$element.each(function(){
    		$(this).text("$" + parseFloat($(this).text()).toFixed(2));
    	});
	}

	function isNumber(value){
		value = parseFloat(value);
		return value === value;  
	}

	function isNotEmpty(string){
		return string.trim() !== "";
	}

	function createModel(name, validate){
		var model 	   = {};
		var attribute  = "[model-name*='" + name + "']";
		var validated  = true;
		var validation = {"isNumber": isNumber, "isNotEmpty": isNotEmpty};
		$.each($(attribute), function(){
			if($(this).attr("data-value")){
            	model[$(this).attr("data-type")] = $(this).attr("data-value");
        	}
        	else{
        		model[$(this).attr("data-type")] = $(this).val();
        	}
    	});

    	if(validate){
    		$.each(validate, function(key, value){
    			validated = validated && validation[key](model[value]);
    		});
    	}

        if(validated){
        	return model;
        }
        else{
        	return validated;
        }	
	}

	function save(url, model, error, success){
		$.ajax({
    		url: url,
    		type: 'POST',
   			dataType: 'json',
   			data: model,
   			error: error,
        	success: success
    	});
	}

    function decrease(min){
        return function(number){
            number = parseInt(number);
            number = number - 1;
            if(number >= min){
                return number;
            }
            else{
                return number + 1;
            }
        };
    }

    function increase(max){
        return function(number){
            number = parseInt(number);
            number = number + 1;
            if(number <= max){
                return number;
            }
            else{
                return number - 1;
            }
        };
    }

    menu.click(function(){
        $(this).toggleClass("selected");
        nav.toggleClass("open");
    });

    Main.createModel 			= createModel;
    Main.setPriceCurrencySymbol = setPriceCurrencySymbol;
    Main.save					= save;
    Main.decrease               = decrease;
    Main.increase               = increase;
    w.Main 						= Main;
}(jQuery, document, window));