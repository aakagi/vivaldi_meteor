Template.class_view.helpers({
    isTeacher: isTeacher,
    teachersArray: function() {
        var ids = Template.currentData().teachers;
        return getUsersByIds(ids);
    },
    studentsArray: function() {
        var ids = Template.currentData().students;
        return getUsersByIds(ids);
    },
    viewTasks: function(){
        return Session.get('viewTasks');
    }, 
    manageClass: function(){
        return Session.get('manageClass');
    },
    showClassTasks: function(){
        return Session.get('showClassTasks');
    }, 
    classStats: function(){
        return Session.get('classStats');
    }
});

Template.class_view.rendered = function () {
    Session.set('viewTasks', true);
    Session.set('manageClass', false);
    Session.set('viewTasks', true);
    Session.set('showClassTasks', false);
};

Template.class_view.events({
    'click #viewTasks': function(){
        Session.set('viewTasks', true);
        Session.set('manageClass', false);
    },
    'click #manageClass': function(){
        Session.set('viewTasks', false);
        Session.set('manageClass', true);
    },
    'click #showClassTasks': function(){
        Session.set('showClassTasks', true);
        Session.set('classStats', false);
    },
    'click #classStats': function(){
        Session.set('showClassTasks', false);
        Session.set('classStats', true);
    }
})
