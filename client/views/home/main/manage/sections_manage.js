Template.sections_manage.rendered = function() {
    Session.set('saveSections', true);
    Session.set('editSections', false);

    Session.set('confirmAddedSection', true);
    Session.set('addNewSection', false);
};


Template.sections_manage.helpers({
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
        }, {sort: {order: 1}}).fetch();
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

Template.sections_manage.events({

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

                    //remove old leader from leaders section
                    var selector = {name: "Section Leaders", _id: {$in: classData.sections}}
                    if (sectionData.leader){
                        Sections.update(selector, {$pull: {users: sectionData.leader}});
                    }


                    //save new leader
                    Sections.update({
                        _id: sectionID
                    }, {
                        $set: {
                            leader: newLeader
                        }
                    });
                    Sections.update(selector, {$push: {users: newLeader}});

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
        if (sectionName) {
            //get the class data
            var classData = Template.currentData();
            var newSectionDoc = {
                name: sectionName,
                users: [],
                order: classData.sections.length + 1,
                locked: false
            };
            var sectionID = Sections.insert(newSectionDoc);
            Classes.update({
                _id: classID
            }, {
                $push: {
                    sections: sectionID
                }
            });
        }
        Session.set('confirmAddedSection', true);
        Session.set('addNewSection', false);
    },
    'click #addNewSection': function() {
        Session.set('confirmAddedSection', false);
        Session.set('addNewSection', true);
    },
    'click #closeManage': function() {
        Session.set('manageSections', false);
    },

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

Template.section_edit_item.events({
    'click #deleteSection': function() {
        console.log('deleting!');
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

Template.section_in_list.events({
    'click #deleteSection': function() {
        console.log('deleting!');
        if (confirm("Are you sure you want to delete this section?") == true) {
            var sectionID = Template.currentData()._id;
            var classData = Template.parentData(1);
            var sectionList = classData.sections;
            console.log(sectionID + '\n' + classData + '\n' + sectionList);
            var indx = sectionList.indexOf(sectionID);
            // Removes from class array
            Meteor.call("deleteSection", sectionID, classData._id);
        } else {
            console.log("Action Cancelled")
        }
    }
});

Template.section_edit_item.helpers({
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
    },


});