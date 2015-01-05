// When the enrollemnt link is clicked, the token is saved to the session
Accounts.onEnrollmentLink(function(token, success) {
    var tokenVar = token;
    Session.set('tokenVar', token);
    return tokenVar;
});

Template.onboard_form.helpers({
    instrumentList: function () {
        return Instrument.find();
    },
    teacherSignUp: function () {
        return Session.get("teacherSignUp");
    }
});

Template.onboard_form.events({
    // Onboard_form submit data to user
    'submit #onboardForm': function(e, t) {
        e.preventDefault();

        var teacherSignUp = Session.get('teacherSignUp');

        var onboardForm = $(e.currentTarget),
            tokenVar = Session.get('tokenVar'),
            password = onboardForm.find('#createPassword').val(),
            passwordConfirm = onboardForm.find('#confirmPassword').val();
        // If user is signing up as a teacher
        var data;
        //TODO: use a user schema with the collection2 package
        if (teacherSignUp) {
                var school = onboardForm.find('#school').val(),
                    honorific = onboardForm.find('#honorific').val(),
                    lastName = onboardForm.find('#lastName').val();

                data = {school: school, firstName: honorific, lastName: lastName, teacher: true};
        } else {
            var instrument = onboardForm.find('#selectInstrument').val(),
                firstName = onboardForm.find('#firstName').val(),
                lastName = onboardForm.find('#lastName').val();


                data = {instrument: instrument, firstName: firstName, lastName: lastName, teacher: false};
        }

        if ( 
            (teacherSignUp || isNotEmpty(selectInstrument) ) 
            && (teacherSignUp || isNotEmpty(firstName)) 
            && (!teacherSignUp || isNotEmpty(honorific))
            && (!teacherSignUp || isNotEmpty(school))
            && isNotEmpty(lastName)
            && isNotEmpty(password) 
            && areValidPasswords(password, passwordConfirm)  ) {

            Accounts.resetPassword(tokenVar, password, function(err, success) {
                if (err) {
                    if (err.message === 'Email already exists. [403]') {
                       setAlert('error', 'We\'re sorry but this email token has been used.');
                       console.log("email token used");
                    } else {
                        setAlert('error', 'An error has occurred.');
                        console.log("some other error");
                        console.log(err)
                    }
                } else {
                    console.log("success!");
                    console.log(instrument);
                    //create document in the userData database
                    userid = Meteor.userId();

                    if (isNotEmpty(selectInstrument)){
                        //create new instrument stats
                        var newStats = {instrumentId: instrument, userId: userid, experience: 0};
                        InstrumentStats.insert(newStats);
                    }

                    Meteor.users.update({"_id": userid}, {$set: {profile: data}}, function(err, numDocs){
                        if (err){
                            setAlert('error', 'Error writing to database.');
                            console.log("database error");
                            console.log(err);
                        }
                        else{
                             //swap out depending on user status
                            studentRedirect();
                        }
                    });
                }
            }); 
        }
    },
    'change .teacher-sign-up input': function (evt) {
        Session.set("teacherSignUp", evt.target.checked);
    }
});