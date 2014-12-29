Template.confirm_email.helpers({
    buttonName: function(){
        return Session.get('buttonName');
    }
});
Template.confirm_email.events({
    'click #button': function() {
        //the button only has one function, because:
        //embedding code as a string in the Session is probably really insecure
        //I can't figure out how to call a function from the name of the function without using eval()
        //the weird syntax makes it possibly more extensible in the future, maybe
        var buttonFunc = function(){
            // user ID saved in the session, will be erased on login
            var userid = Session.get('newUserId');
            Accounts.sendEnrollmentEmail(userid);
        };
        buttonFunc();
    }
})