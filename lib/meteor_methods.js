Meteor.methods({
    // Creates a new user and then sends an enrollment email
    'createUserFromEmail' : function (email) {
        var newUserId = Accounts.createUser({email: email});
        Accounts.sendEnrollmentEmail(newUserId);
        return newUserId
    }
});
