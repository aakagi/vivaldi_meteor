// When the enrollemnt link is clicked, the token is saved to the session
Accounts.onResetPasswordLink(function(token, success) {
    var tokenVar = token;
    Session.set('tokenVar', token);
    Router.go('reset_password');
    return tokenVar;
});


Template.reset_password.events({
    'submit #resetPasswordForm': function(e, t) {
        e.preventDefault();

        var password = document.getElementById('newPassword').value;
        var confirm = document.getElementById('newPassword').value

        if (password == confirm) {
            Accounts.resetPassword(Session.get('tokenVar'), password, function(err) {
                if (err) {
                    setAlert('error', 'an error occured.');
                } else {
                    setAlert('info', 'password reset!');
                    Session.set('tokenVar', null);
                    Router.go('home');
                }
            })
        } else {
            setAlert('error', 'passwords did not match.');
        }
    }
});