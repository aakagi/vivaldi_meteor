Template.class_manage.events({
    'click #saveClass': function() {
        var classData = Template.currentData();
        var classID = classData._id;
        // console.log(classData);
        var name;
        var newName = document.getElementById('newName').value;
        if (newName) {
            name = newName;
        } else {
            name = classData.name;
        }
        var isLocked = document.getElementById('lockedBox').checked;
        Classes.update({
            _id: classID
        }, {
            $set: {
                name: name,
                locked: isLocked
            }
        }, function(err) {
            if (err) {
                console.log(err);
                setAlert('error', 'Error writing to database');
            } else {
                setAlert('info', 'Class updated successfully!');
            }
        });
    },
    'click #deleteClass': function() {
        if (confirm("Are you absolutely certain about deleting this class? You will not be able to undo changes.") == true) {
            var classData = Template.currentData();
            var classID = classData._id;
            Meteor.call('deleteClass', classID);
            Router.go('home')
        } else {
            console.log("Action Cancelled")
        }
    },
    'click #closeManage': function() {
        Session.set('manageClass', false);
    }
});

Template.class_manage.helpers({
    'isLocked': function() {
        return Template.currentData().locked
    },
});