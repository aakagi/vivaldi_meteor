Template.user_view.helpers({
    userClasses: userClasses,
    isTeacher: isTeacher,
    // Wrong
    studentProfile: function() {
        return !isTeacher();
    },
    notInSameClass: function(){
        var myID = Meteor.userId();
        var thisID = Template.currentData._id;
        return !studentsInSameClass(myID, thisID);
    },
    userIsMe: function() {
        return Template.currentData()._id == Meteor.userId();
    },
    unrelatedStudent: function() {
        return !isTeacher  && !studentsInSameClass(myID, thisID);
    },
    userMessage: function() {
        return Session.get('userMessage');
    },
    userStats: function() {
        return Session.get('userStats');
    }
});

Template.user_view.rendered = function () {
    Session.set('userMessage', true);
    Session.set('userStats', false);
};

Template.user_view.events({
    'click #userMessage': function(){
        Session.set('userMessage', true);
        Session.set('userStats', false);
    },
    'click #userStats': function(){
        Session.set('userMessage', false);
        Session.set('userStats', true);
    }
    // 'click #showTasks': function(){
    //     Session.set('showTasks', true);
    //     Session.set('completedTasks', false);
    //     Session.set('practice', false);
    // },
    // 'click #completedTasks': function(){
    //     Session.set('showTasks', false);
    //     Session.set('completedTasks', true);
    //     Session.set('practice', false);
    // },
    // 'click #practice': function(){
    //     Session.set('showTasks', false);
    //     Session.set('completedTasks', false);
    //     Session.set('practice', true);
    // },
})