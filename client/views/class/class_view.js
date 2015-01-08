Template.class_view.helpers({
    isTeacher: isTeacher,
    teachersArray: function() {
        var ids = Template.currentData().teachers;
        // return getUsersByIds(ids);
        var results = Meteor.users.find({
            _id: {
                $in: ids
            }
        }).fetch();
        return results;
    },
    studentsArray: function() {
        var ids = Template.currentData().students;
        // return getUsersByIds(ids);
        var results = Meteor.users.find({
            _id: {
                $in: ids
            }
        }).fetch();
        return results;
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
    },
    // chartsOpen: function() {
    //     return Session.get('classChartsOpen');
    // }
});

Template.class_view.rendered = function () {
    // For Teachers
    Session.set('viewTasks', true);
    Session.set('manageClass', false);
    // For Students
    Session.set('classTasks', true);
    Session.set('classStats', false);

    // Charts
    // Session.set('classChartsOpen', false);

    // $('.chart-1').resize(function(event) {
    //     console.log('resized');
    // });
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
    },
    // 'click #toggleCharts': function() {
    //     var open = Session.get('classChartsOpen');
    //     if (!open) {
    //         // $('.graph-wrapper-2').css('display', 'inline-block');
    //         // $('.graph-wrapper-3').css('display', 'inline-block');
    //         // $('.graph-wrapper-1').removeClass('width100');
    //         // canvas = document.getElementById('weeklyOverview');
    //         // $('#weeklyOverview').width('575');
    //         // canvas.width = 575;
    //         Session.set('classChartsOpen', true);
    //         canvas = document.getElementById('weeklyOverview');
    //         $('.chart-1').width(320);
    //     }
    //     else {
    //         // $('.graph-wrapper-2').css('display', 'none');
    //         // $('.graph-wrapper-3').css('display', 'none');
    //         // $('.graph-wrapper-1').addClass('width100');
    //         Session.set('classChartsOpen', false);
    //     }
    // },
})
