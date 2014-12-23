Template.change_name.helpers({
    firstName: function() {
        userid = Meteor.userId();
        profile = Meteor.users.findOne({
            "_id": userid
        }, {
            fields: {
                profile: 1
            }
        });
        return profile.firstName;
    },
    lastName: function() {
        userid = Meteor.userId();
        profile = Meteor.users.findOne({
            "_id": userid
        }, {
            fields: {
                profile: 1
            }
        });
        return profile.lastName;
    }
});

//#firstName
//#lastName
Template.alert.events({
    'click #saveName': function() {
        userid = Meteor.userId();
        newFirst = document.getElementById('firstName').value
        newLast = document.getElementById('lastName').value
        prof = Meteor.users.findOne({
            "_id": userid
        }, {
            fields: {
                profile: 1
            }
        });
        prof.firstName = newFirst;
        prof.lastName = newLast;
        Meteor.users.update({
            "_id": userid
        }, {
            $set: {
                profile: prof
            }
        }),
        function(err, numDocs) {
            if (err) {
                setAlert('error', 'Error writing to database.');
                console.log("database error");
                console.log(err);
            } else {
                //swap out depending on user status
                setAlert('alert', 'name change successful!');
            }
        });
});