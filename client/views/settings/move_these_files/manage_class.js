Template.manage_class.events({
    'click #saveClass': function() {
        var classData = Template.currentData();
        var classID = classData._id;
        console.log(classData);
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
                setAlert('error', 'error writing to database');
            } else {
                setAlert('info', 'class updated successfully!');
            }
        });
    }
});

Template.manage_class.helpers({
    'studentList': function() {
        var studentIDs = Template.currentData().students;
        console.log(studentIDs);
        var results = Meteor.users.find({
            _id: {
                $in: studentIDs
            }
        }).fetch();
        return results;
    },
    'waitList': function() {
        var studentIDs = Template.currentData().waitlist;
        console.log(studentIDs);
        var results = Meteor.users.find({
            _id: {
                $in: studentIDs
            }
        }).fetch();
        return results;
    },
    'isLocked': function() {
        return Template.currentData().locked
    }
});


Template.waitlist_students.events({
    'click #confirmStudent': function() {
        var studentID = Template.currentData()._id;
        var classData = Template.parentData(1); 
        var waitList = classData.waitlist;
        var studentList = classData.students;
        var indx = waitList.indexOf(studentID);
        waitList.splice(indx, 1);
        studentList.push(studentID);
        console.log(waitList);
        console.log(studentList);
        Classes.update({
            _id: classData._id
        }, {
            $set: {
                students: studentList,
                waitlist: waitList
            }
        }, function(err) {
            if (err) {
                console.log(err);
                setAlert('error', 'error writing to database');
            } else {
                setAlert('info', 'student confirmed!');
            }
        });
    }
});

Template.students.events({
    'click #deleteStudent': function() {
        var studentID = Template.currentData()._id;
        var classData = Template.parentData(1);
        var studentList = classData.students;
        var indx = studentList.indexOf(studentID);
        studentList.splice(indx, 1);
        Classes.update({
            _id: classData._id
        }, {
            $set: {
                students: studentList
            }
        }, function(err) {
            if (err) {
                console.log(err);
                setAlert('error', 'error writing to database');
            } else {
                setAlert('info', 'student deleted');
            }
        });
    }
});