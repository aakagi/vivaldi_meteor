Template.change_school.helpers({
    schoolName: currentSchool;
});

Template.change_school.events({
    'click #saveSchool': function() {
    	//setAlert('error', 'button clicked!');
    	//console.log("clicked");
        userid = Meteor.userId();
        newSchool = document.getElementById('schoolName').value
        user = Meteor.users.findOne({
            "_id": userid
        }, {
            fields: {
                profile: 1
            }
        });
        prof = user.profile
        prof.school = newSchool;
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
                setAlert('info', 'school change successful!');
            }
        });
    }
});