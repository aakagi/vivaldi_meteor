Template.manage_class.events({
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
    }
});

Template.manage_class.helpers({
    'studentList': function() {
        var studentIDs = Template.currentData().students;
        // console.log(studentIDs);
        var results = Meteor.users.find({
            _id: {
                $in: studentIDs
            }
        }).fetch();
        return results;
    },
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
    'isLocked': function() {
        return Template.currentData().locked
    },
    'sectionList': function() {
        var sectionIds = Template.currentData().sections;
        // console.log(sectionIds);
        var returnSections = Sections.find({
            _id: {
                $in: sectionIds
            },
            name: {
                $ne: 'Teachers'
            }
        }).fetch();
        return returnSections;
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
                setAlert('error', 'Error writing to database');
            } else {
                setAlert('info', 'Student confirmed!');
            }
        });
    }
});

Template.class_students.events({
    'click #deleteStudent': function() {
        if (confirm("Are you sure you want to delete this student?") == true) {
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
                    setAlert('error', 'Error writing to database');
                } else {
                    setAlert('info', 'Student deleted');
                }
            });
        } else {
            console.log("Action Cancelled")
        }
    }
});

Template.class_sections.events({
    'click #deleteSection': function(){
        var sectionID = Template.currentData()._id;
        var classData = Template.parentData(1);
        var sectionList = classData.sections;
        var indx = sectionList.indexOf(sectionID);
        if (confirm("Are you sure you want to delete this section?") == true) {
            // Remove from class array
            Classes.update({
                _id: classData._id
            }, {
                $set: {
                    sections: sectionList
                }
            }, function(err) {
                if (err) {
                    console.log(err);
                    setAlert('error', 'Error changing database');
                } else {
                    // Then remove section document
                    Sections.remove({_id: sectionID});
                    setAlert('info', 'Section deleted')
                }

            });
        } else {
            console.log("Action Cancelled")
        }
    }
});