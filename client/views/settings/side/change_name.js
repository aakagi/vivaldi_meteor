Template.change_name.helpers({
    firstName: function() {
        userid = Meteor.userId();
        user = Meteor.users.findOne({
            "_id": userid
        }, {
            fields: {
                profile: 1
            }
        });
        return user.profile.firstName;
    },
    lastName: function() {
        userid = Meteor.userId();
        user = Meteor.users.findOne({
            "_id": userid
        }, {
            fields: {
                profile: 1
            }
        });
        return user.profile.lastName;
    }
});

//#firstName
//#lastName
Template.change_name.events({
    'click #saveName': function() {
        userid = Meteor.userId();
        newFirst = document.getElementById('firstName').value
        newLast = document.getElementById('lastName').value
        user = Meteor.user();
        prof = user.profile;
        prof.firstName = newFirst;
        prof.lastName = newLast;
        Meteor.users.update({
            "_id": userid
        }, {
            $set: {
                profile: prof
            }
        },
        function(err, numDocs) {
            if (err) {
                setAlert('error', 'Error writing to database.');
                console.log("database error");
                console.log(err);
            } else {
                console.log("works!");
                setAlert('info', 'Name change successful!');
            }
        });
    }
});