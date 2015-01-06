Template.students_manage.helpers({
    'studentList': function() {
        var studentIDs = Template.currentData().students;
        // console.log(studentIDs);
        var results = Meteor.users.find({
            _id: {
                $in: studentIDs
            }
        }).fetch();
        return results;
    }
});

Template.students_manage.events({
    'click #closeManage': function() {
        Session.set('manageStudents', false);
    },
});

Template.student_in_list.events({
    'click #deleteStudent': function() {
        if (confirm("Are you sure you want to delete this student?") == true) {
            var studentID = Template.currentData()._id;
            var classData = Template.parentData(1);
            var studentList = classData.students;
            var indx = studentList.indexOf(studentID);
            studentList.splice(indx, 1);
            // TODO: Delete student from sections as well!
            Classes.update({
                _id: classData._id
            }, {
                $set: {
                    students: studentList
                }
            }, function(err) {
                if (err) {
                    console.log(err);
                    setAlert('error', 'Error writing to database');
                } else {
                    setAlert('info', 'Student deleted');
                }
            });
        } else {
            console.log("Action Cancelled")
        }
    },
});


