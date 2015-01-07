Template.class_view.helpers({
    isTeacher: isTeacher,
    // studentsArray: function() {
    //     var ids = Template.currentData().students;
    //     // return getUsersByIds(ids);
    //     var results = Meteor.users.find({
    //         _id: {
    //             $in: ids
    //         }
    //     }).fetch();
    //     return results;
    // },
    notInThisClass: function() {
        var myId = Meteor.userId();
        var classTeachers = Template.currentData().teachers;

        // Eventually change this to .contains - I just couldn't figure it out for now
        if (classTeachers == myId) {
            // As in, I'm in this class
            return false;
        } else {
            return true;
        }
    },
    viewTasks: function(){
        return Session.get('viewTasks');
    }, 
    manageClass: function(){
        return Session.get('manageClass');
    },
    classTasks: function(){
        return Session.get('classTasks');
    }, 
    classStats: function(){
        return Session.get('classStats');
    }
});

Template.class_view.rendered = function () {
    // For Teachers
    Session.set('viewTasks', true);
    Session.set('manageClass', false);
    // For Students
    Session.set('classTasks', true);
    Session.set('classStats', false);
};

Template.class_view.events({
    // For Teachers
    'click #viewTasks': function(){
        Session.set('viewTasks', true);
        Session.set('manageClass', false);
    },
    'click #manageClass': function(){
        Session.set('viewTasks', false);
        Session.set('manageClass', true);
    },
    // For Students
    'click #classTasks': function(){
        Session.set('classTasks', true);
        Session.set('classStats', false);
    },
    'click #classStats': function(){
        Session.set('classTasks', false);
        Session.set('classStats', true);
    }
})
