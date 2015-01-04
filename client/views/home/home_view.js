Template.home_view.helpers({
    userClasses: userClasses,
    studentSections: studentSections,
    isTeacher: isTeacher,
    showClasses: function() {
    	return Session.get('showClasses');
    }, 
    seeLeaderboards: function() {
    	return Session.get('seeLeaderboards');
    },
    showTasks: function() {
    	return Session.get('showTasks');
    }, 
    completedTasks: function() {
    	return Session.get('completedTasks');
    },
    practice: function() {
    	return Session.get('practice');
    }
});

Template.home_view.rendered = function () {
    // Teacher
    Session.set('showClasses', true);
    Session.set('seeLeaderboards', false);
    // Student
    Session.set('showTasks', true);
    Session.set('completedTasks', false);
    Session.set('completedTasks', false);  
};

Template.home_view.events({
	'click #showClasses': function(){
		Session.set('showClasses', true);
		Session.set('seeLeaderboards', false);
	},
	'click #seeLeaderboards': function(){
		Session.set('showClasses', false);
		Session.set('seeLeaderboards', true);
	},
	'click #showTasks': function(){
		Session.set('showTasks', false);
		// Session.set('completedTasks', false);
		Session.set('practice', false);
	},
	// 'click #completedTasks': function(){
	// 	Session.set('showTasks', false);
	// 	Session.set('completedTasks', true);
	// 	Session.set('practice', false);
	// },
	'click #practice': function(){
		Session.set('showTasks', true);
		// Session.set('completedTasks', false);
		Session.set('practice', true);
	},
})
