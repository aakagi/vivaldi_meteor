confirmRedirect = function() {
    Router.go('confirm_email');
}

Template.sign_up.events({
    'submit #signUpForm': function(e, t) {
        e.preventDefault();

        var signUpForm = $(e.currentTarget),
            email = trimInput(signUpForm.find('#signUpEmail').val().toLowerCase());

        if (isNotEmpty(email) && isEmail(email)) {
            Meteor.call('createUserFromEmail', email, function(err, newId) {
                if (err) {
                    if (err.message === 'Email already exists. [403]') {
                        setAlert('error', 'We\'re sorry but this email is already used.');
                        
                    } else {
                        console.log("some other error went wrong.")
                        console.log(err);
                        setAlert('error', 'Sorry, something went wrong. Please email vivaldimailer@gmail.com to report your problem.');
                    }
                } else {
                    // Session.set('buttonName', 'Resend Email');
                    // Session.set('email', email);
                    // Session.set('newId', newId);
                    // setAlert('info', 'Awesome! You\'ll receieve an email shortly to finish making your account.');
                    setTimeout(confirmRedirect(), 1000);
                }
            });
        }
        return false;
    },
});