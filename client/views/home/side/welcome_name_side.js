Template.welcome_name_side.helpers({
    myName: function() {
        if(Meteor.user()){
            var userRecord = Meteor.user();
            var firstAndLast = userRecord.profile.firstName + ' ' + userRecord.profile.lastName;
            return firstAndLast;
        }
    }
});