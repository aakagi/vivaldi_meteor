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
        var classStudents = Template.currentData().students;

        // var selector = {
        //     $and: {
        //         $elemMatch
        //     }
        // }

        // Eventually change this to .contains - I just couldn't figure it out for now
        if (classTeachers == myId) {
            // As in, I'm in this class
            return false;
        } else {
            return true;
        }
    },

    // you want to do an $and and two $elemMatch queries with 
    // teachers and students, if teachers are an array (which I think they are

    viewTasks: function(){
        return Session.get('viewTasks');
    },
    classStats: function(){
        return Session.get('classStats');
    },
    currentChallenge: function() {
        return activeChallengeWithClass(Template.currentData()._id);
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
