Template.forgot_password.events({
    'submit #forgotPasswordForm': function(e, t) {
        e.preventDefault();

        var forgotPasswordForm = $(e.currentTarget),
            email = trimInput(forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase());

        if (isNotEmpty(email) && isEmail(email)) {
            Accounts.forgotPassword({email: email}, function(err) {
                if (err) {
                    if (err.message === 'User not found [403]') {
                        Session.set('alert', 'This email does not exist.');
                        Session.set('alertType', 'error');
                    } else {
                        Session.set('alert', 'We\'re sorry but something went wrong.');
                        Session.set('alertType', 'error');
                    }
                } else {
                    // From sign_up.js - I know it's poorly organized, but get over it. That's what the comment is for.
                    confirmRedirect();
                }
            });
        }
        return false;
    },

    'click #returnToSignIn': function(e, t) {
        Session.set('showForgotPassword', null);
        return false;
    },
});