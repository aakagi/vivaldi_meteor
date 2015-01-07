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
    classStats: function(){
        return Session.get('classStats');
    }
});

Template.class_view.rendered = function () {
    Session.set('viewTasks', true);
    Session.set('classStats', false);

};

Template.class_view.events({
    // For Teachers
    'click #viewTasks': function(){
        Session.set('viewTasks', true);
        Session.set('classStats', false);
    },
    'click #classStats': function(){
        Session.set('viewTasks', false);
        Session.set('classStats', true);
    },
})
