Template.confirm_email.helpers({
    newId: function(){
        var newUser = Template.currentData().newId;
        return newUser;
    }
});
Template.confirm_email.events({
    'click #resendEmail': function() {
        //the button only has one function, because:
        //embedding code as a string in the Session is probably really insecure
        //I can't figure out how to call a function from the name of the function without using eval()
        //the weird syntax makes it possibly more extensible in the future, maybe
        var buttonFunc = function(){
            // user ID saved in the session, will be erased on login
            // var userid = Session.get('newUserId');
            Accounts.sendEnrollmentEmail(newId);
        };
        buttonFunc();
    }
})