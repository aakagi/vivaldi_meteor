Template.home_view.helpers({
    studentSections: studentSections,
    isTeacher: isTeacher,
    showClasses: function(){
    	return Session.get('showClasses');
    }, 
    allOtherClasses: function(){
    	return Session.get('allOtherClasses');
    },
    showTasks: function(){
    	return Session.get('showTasks');
    }, 
    completedTasks: function(){
    	return Session.get('completedTasks');
    },
    practice: function(){
    	return Session.get('practice');
    }
});

Template.home_view.events({
	'click #showClasses': function(){
		Session.set('showClasses', false);
		Session.set('allOtherClasses', false);
	},
	'click #allOtherClass': function(){
		Session.set('showClasses', true);
		Session.set('allOtherClasses', true);
	},
	'click #showTasks': function(){
		Session.set('showTasks', true);
		Session.set('completedTasks', false);
		Session.set('practice', false);
	},
	'click #completedTasks': function(){
		Session.set('showTasks', false);
		Session.set('completedTasks', true);
		Session.set('practice', false);
	},
	'click #practice': function(){
		Session.set('showTasks', false);
		Session.set('completedTasks', false);
		Session.set('practice', true);
	},
})
