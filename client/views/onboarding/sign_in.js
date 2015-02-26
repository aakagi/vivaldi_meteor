studentRedirect = function(){
    Router.go('home');
}
teacherRedirect = function(){
    Router.go('home');
}
Template.sign_in.events({
    'submit #signInForm': function(e, t) {
        e.preventDefault();

        var signInForm = $(e.currentTarget),
            email = trimInput(signInForm.find('.email').val().toLowerCase()),
            password = signInForm.find('.password').val();


        if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password)) {

            Meteor.loginWithPassword(email, password, function(err) {
                if (err) {
                    setAlert('error', 'We\'re sorry but these credentials are not valid.');
                } else {
                    setAlert('info', 'Welcome!');
                    console.log("successful login!");
                    //eventually swap functions out depending on user status
                    studentRedirect();
                }
            });
        }
        return false;
    },
});



