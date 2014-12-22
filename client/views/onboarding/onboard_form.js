

Accounts.onEnrollmentLink(function(token, success) {
    var tokenVar = token;
    Session.set('tokenVar', token);
    return tokenVar;
});



Template.onboard_form.helpers({
    instrumentList: function () {
        return Instrument.find();
    }
});

Template.onboard_form.events({
    'submit #onboardForm': function(e, t) {
        e.preventDefault();

        var onboardForm = $(e.currentTarget),
            instrument = onboardForm.find('#selectInstrument').val(),
            password = onboardForm.find('#createPassword').val(),
            passwordConfirm = onboardForm.find('#confirmPassword').val(),
            tokenVar = Session.get('tokenVar');

        console.log(instrument);
        console.log(password);
        console.log(passwordConfirm);
        console.log(tokenVar);

        if (isNotEmpty(password) && isNotEmpty(instrument) && areValidPasswords(password, passwordConfirm)) {
            Accounts.resetPassword(tokenVar, password, function(err, success) {
                if (err) {
                    if (err.message === 'Email already exists. [403]') {
                        Session.set('alert', 'We\'re sorry but this email token has been used.');
                        Session.set('alertType', 'error');
                    } else {
                        Session.set('alert', 'An error has occurred.');
                        Session.set('alertType', 'error');
                    }
                } else {
                    console.log("success!");
                    console.log(instrument);
                }
            }); 
        }
    },
});