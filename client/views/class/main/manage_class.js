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
    }
});

Template.manage_class.rendered = function() {
    Session.set('saveSections', true);
    Session.set('editSections', false);

    Session.set('confirmAddedSection', true);
    Session.set('addNewSection', false);
};

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
    },
    'saveSections': function() {
        return Session.get('saveSections');
    },
    'editSections': function() {
        return Session.get('editSections');
    },
    'confirmAddedSection': function() {
        return Session.get('confirmAddedSection');
    },
    'addNewSection': function() {
        return Session.get('addNewSection');
    },
});

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
    },
    'click #deleteClass': function() {
        if (confirm("Are you absolutely certain about deleting this class? You will not be able to undo changes.") == true) {
            // Delete Class
        } else {
            console.log("Action Cancelled")
        }
    },
    'click #saveSections': function() {
        //save all changes

        var classData = Template.currentData();

        for (indx in classData.sections) {
            console.log(indx);
            //get all new fields
            var sectionID = classData.sections[indx];
            var sectionData = Sections.findOne({
                _id: sectionID
            });
            if (document.getElementById(sectionID + "name")) { //if this is false, then the section is not visible
                var newName = document.getElementById(sectionID + "name").value;
                var newLeader = document.getElementById(sectionID + "leader").value;
                var newOrder = document.getElementById(sectionID + "order").value;
                if (newName != sectionData.name) {
                    //new name
                    Sections.update({
                        _id: sectionID
                    }, {
                        $set: {
                            name: newName
                        }
                    });
                }

                if (newLeader != 'noleader' && newLeader != sectionData.leader) {
                    console.log("saving new leader");
                    //save new leader
                    Sections.update({
                        _id: sectionID
                    }, {
                        $set: {
                            leader: newLeader
                        }
                    });
                }
                if (newOrder) {
                    //save new order
                    Sections.update({
                        _id: sectionID
                    }, {
                        $set: {
                            order: newOrder
                        }
                    });
                }
            }

        }
        Session.set('saveSections', true);
        Session.set('editSections', false);

    },
    'click #editSections': function() {
        Session.set('saveSections', false);
        Session.set('editSections', true);
    },
    'click #confirmAddedSection': function() {
        //get the new section name: 
        var classID = Template.currentData()._id;
        console.log("confirming");
        var sectionName = document.getElementById('newAddedSection').value
        console.log(sectionName);
        if (sectionName){
            //get the class data
            var classData = Template.currentData();
            var newSectionDoc = {
                    name: sectionName,
                    users: [],
                    order: classData.sections.length
                };
            var sectionID = Sections.insert(newSectionDoc);
            Classes.update({_id: classID}, {$push:{sections: sectionID}});
        }
        Session.set('confirmAddedSection', true);
        Session.set('addNewSection', false);
    },
    'click #addNewSection': function() {
        Session.set('confirmAddedSection', false);
        Session.set('addNewSection', true);

       
        
    },
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
    }
});

Template.class_sections.events({
    'click #deleteSection': function() {
        if (confirm("Are you sure you want to delete this section?") == true) {
            var sectionID = Template.currentData()._id;
            var classData = Template.parentData(1);
            var sectionList = classData.sections;
            var indx = sectionList.indexOf(sectionID);
            // Removes from class array
            Meteor.call("deleteSection", sectionID, classData._id);
        } else {
            console.log("Action Cancelled")
        }
    }
});

Template.edit_sections.helpers({
    'click #deleteSection': function() {
        if (confirm("Are you sure you want to delete this section?") == true) {
            var sectionID = Template.currentData()._id;
            var classData = Template.parentData(1);
            var sectionList = classData.sections;
            var indx = sectionList.indexOf(sectionID);
            // Removes from class array
            Meteor.call("deleteSection", sectionID, classData._id);
        } else {
            console.log("Action Cancelled")
        }
    }
});

Template.edit_sections.helpers({
    'currentLeader': function() {
        if (Template.currentData().leader) {
            var result = Meteor.users.findOne({
                _id: Template.currentData().leader
            });
            return result;
        } else {
            return {
                profile: {
                    firstName: "No",
                    lastName: "Leader"
                },
                _id: "noleader"
            }
        }
    },
    'sectionStudentsNotLeader': function() {
        console.log("test");
        return Meteor.users.find({
            $and: [{
                _id: {
                    $in: Template.currentData().users
                }
            }, {
                _id: {
                    $ne: Template.currentData().leader
                }
            }]
        }).fetch();
    }
});