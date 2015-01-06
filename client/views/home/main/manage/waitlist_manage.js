Template.waitlist_manage.helpers({
    'waitList': function() {
        var studentIDs = Template.currentData().waitlist;
        // console.log(studentIDs);
        var results = Meteor.users.find({
            _id: {
                $in: studentIDs
            }
        }).fetch();
        return results;
    },
    pendingStudents: function(){
        return Template.currentData().waitlist.length
    },
});

Template.waitlist_manage.events({
    'click #closeManage': function() {
        Session.set('managePending', false);
    },
});

Template.student_in_waitlist.events({
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
                setAlert('error', 'Error writing to database');
            } else {
                // setAlert('info', 'Student confirmed!');
            }
        });
    },
    'click #denyStudent': function() {
        if (confirm("Are you sure you want to deny this student?") == true) {
            var studentID = Template.currentData()._id;
            var classData = Template.parentData(1);
            var studentList = classData.waitlist;
            var indx = studentList.indexOf(studentID);
            studentList.splice(indx, 1);
            // TODO: Delete student from sections as well!
            Classes.update({
                _id: classData._id
            }, {
                $set: {
                    waitlist: studentList
                }
            }, function(err) {
                if (err) {
                    console.log(err);
                    setAlert('error', 'Error writing to database');
                } else {
                    // setAlert('info', 'Student denied');
                }
            });
        } else {
            console.log("Action Cancelled")
        }
    },

});
