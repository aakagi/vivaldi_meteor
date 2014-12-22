Template.sign_up.events({
    'submit #signUpForm': function(e, t) {
        e.preventDefault();

        var signUpForm = $(e.currentTarget),
            email = trimInput(signUpForm.find('#signUpEmail').val().toLowerCase());

        if (isNotEmpty(email) && isEmail(email)) {
            Meteor.call('createUserFromEmail', email, function(err) {
                if (err) {
                    if (err.message === 'Email already exists. [403]') {
                        Session.set('alert', 'We\'re sorry but this email is already used.');
                        Session.set('alertType', 'error');
                    } else {
                        Session.set('alert', 'Sorry, something went wrong. Please email vivaldimailer@gmail.com to report your problem.');
                        Session.set('alertType', 'error');
                    }
                } else {
                        Session.set('alert', 'Awesome! You\'ll receieve an email shortly to finish making your account.');
                        Session.set('alertType', 'info');
                }
            });
        }
        return false;
    },
});