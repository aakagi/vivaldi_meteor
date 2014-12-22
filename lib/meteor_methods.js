
Meteor.methods({
  'createUserFromEmail' : function (email) {
    var newUserId = Accounts.createUser({email: email});
    Accounts.sendEnrollmentEmail(newUserId);
  }
});
