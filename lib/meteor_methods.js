Meteor.methods({
    // Creates a new user and then sends an enrollment email
    'createUserFromEmail' : function (email) {
        var newUserId = Accounts.createUser({email: email});
        Accounts.sendEnrollmentEmail(newUserId);
        return newUserId
    },
    // Sets the dropdown alert and then clears it
    'setAlert' : function (alertType, alert) {
        Session.set('alert', alert);
        Session.set('alertType', alertType);
        setInterval(function () {
            console.log("timeout");
            Session.set('alert', null);
            Session.set('alertType', null);
            Session.set('buttonName', null);
        }, 3200);
    }
>>>>>>> 243fbc773cdbdfa3a7de3b728d8ea9f8e016b99b
});
