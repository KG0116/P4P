var Customer = require('../models/customers');
var passwordHash = require('password-hash');
var customerController = {};

customerController.login = function(req, res){
	var username = req.body.username;
    var password = req.body.password;

	req.checkBody({
    	'username': {
    		notEmpty: true,
    	    errorMessage: 'username/username*'
    	},
    	'password': {
    		notEmpty: true,
    		errorMessage: 'password/password*'
    	}

    });
    var errors = req.validationErrors();
    if(errors.length > 0){
    	errors.forEach(function(element){
    		req.flash('login_error', element.msg);
    	});
    	res.redirect('/login');
    }
    else{
    	Customer.getCustomerByUserName(username, function(err, customer){
    		if(err) throw err;
    		
    		else if(customer === null){
    			req.flash('login_error', 'username/username not found');
    			res.redirect('/login');
    		}

    		else if(!passwordHash.verify(password, customer.password)){
    			req.flash('login_error', 'password/check your password');
    			res.redirect('/login');
    		}

    		else{
    			req.session.authenticated = true;
                req.session.username = username;
    			res.redirect('/')
    		}
    	});
    }
}

customerController.register = function(req, res){
	var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var passwordConfirmation  = req.body.password_confirmation;
    var errorCount = 0;
    var customer;
    var errors;
    var user;

	req.checkBody({
        'username': {
            notEmpty: true,
            errorMessage: 'username/username* (6-20 chars)',
            isLength: {
                options: [6, 20],
                errorMessage: 'username/username* (6-20 chars)'
            }
        },
        'email': {
            notEmpty: true,
            errorMessage: 'email*',
            isEmail: {
                errorMessage: 'email/invalid email'
            }
        },
        'password': {
            notEmpty: true,
            errorMessage: 'password/password* (6 chars)',
            isLength: {
                options: [6],
                errorMessage: 'password/password* (6 chars)'
            }
        }    
    });

    errors = req.validationErrors();


    if(errors.length > 0){
        errors.forEach(function(element){
            req.flash('account_error', element.msg);
            errorCount = errorCount + 1;
        });     
    }

    if(password !== passwordConfirmation){
        req.flash('account_error', 'password/passwords do not match');
        errorCount = errorCount + 1;
    }

    Customer.getCustomerByUserName(username, function(err, customer){
        if(err) throw err;

        try{
            if(Object.keys(customer).length > 0){
                req.flash('account_error', "username/username already taken");
                errorCount = errorCount + 1;  
            }
        }
        catch(error){
            console.log(error, customer);
        }
        
        if(errorCount > 0){
            res.redirect('/register');
        } 
        else{
            customer = new Customer({
                name: {first: req.body.first_name, last: req.body.last_name},
                username: username,
                email: email,
                password: passwordHash.generate(password)
            });
            customer.save(function(err){
                if(err) throw err;
            });
            req.session.authenticated = true;
            req.session.username = username;
            res.redirect('/');
        }  
    });
}

module.exports = customerController;