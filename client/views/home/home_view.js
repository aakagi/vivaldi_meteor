Template.home_view.helpers({
    userClasses: userClasses,
    studentSections: studentSections,
    isTeacher: isTeacher,
    // Teacher home toggle between classes and leaderboards
    showClasses: function() {
    	return Session.get('showClasses');
    }, 
    seeLeaderboards: function() {
    	return Session.get('seeLeaderboards');
    },
    // Student home toggle between Tasks and Stats
    showTasks: function() {
    	return Session.get('showTasks');
    }, 
    viewStats: function() {
    	return Session.get('viewStats');
    }
});

Template.home_view.rendered = function () {
    // Teacher home toggle between classes and leaderboards
    Session.set('showClasses', true);
    Session.set('seeLeaderboards', false);
    // Student home toggle between Tasks and Stats
    Session.set('showTasks', true);
    Session.set('viewStats', false);

    var streakCanvas = document.getElementById("streak");
    var streakCtx = streakCanvas.getContext("2d");

    drawBoxes(streakCanvas, streakContext);

};

Template.home_view.events({
    // Teacher home toggle between classes and leaderboards
	'click #showClasses': function(){
		Session.set('showClasses', true);
		Session.set('seeLeaderboards', false);
	},
	'click #seeLeaderboards': function(){
		Session.set('showClasses', false);
		Session.set('seeLeaderboards', true);
	},
    // Student home toggle between Tasks and Stats
	'click #showTasks': function(){
		Session.set('showTasks', true);
		Session.set('viewStats', false);
	},
    'click #viewStats': function() {
        Session.set('showTasks', false);
        Session.set('viewStats', true);
    },
})
