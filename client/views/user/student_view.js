Template.student_view.helpers({
    userClasses: userClasses,
    isTeacher: isTeacher,
    // teacherProfile: function() {
    //     console.log(Template.currentData().profile.teacher);
    //     return true;
    // },
    notInSameClass: function(){
        var myID = Meteor.userId();
        var thisID = Template.currentData._id;
        return !studentsInSameClass(myID, thisID);
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
Template.student_view.rendered = function () {
    Session.set('userMessage', true);
    Session.set('userStats', false);
};
Template.student_view.events({
    'click #userMessage': function(){
        Session.set('userMessage', true);
        Session.set('userStats', false);
    },
    'click #userStats': function(){
        Session.set('userMessage', false);
        Session.set('userStats', true);
    }
})