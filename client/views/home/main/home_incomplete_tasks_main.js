Template.home_incomplete_tasks_main.rendered = function() {
	Session.set('showIncomplete', true);
    // For toggle between tasks and practice - May disable this option though...
    Session.set('backToTasks', true);
    Session.set('practiceView', false);
    Session.set('showVideo', false);

    Session.set('showCurrent', true);
}

Template.home_incomplete_tasks_main.events({
	'click .listenTask': function() {
		Session.set('showVideo', true);
		Session.set('listenTaskObject', this);
	},
	'click .practiceTask': function() {
		var task = Tasks.findOne({_id: this.taskId});
		console.log(task);
		Session.set('PracticeTaskObject', task);
		Session.set('duration', task.duration);
		Session.set('secondsPracticed', this.progress);
        // Sets variables for practice view to show timer
        Session.set('practiceTask', true);
        Session.set('taskPicked', true);
        // Takes user to practice view
        Session.set('backToTasks', false);
        Session.set('practiceView', true);
	},
	'click #toggleTasks': function() {
		if (Session.get('showIncomplete')) {
			Session.set('showIncomplete', false);
			$('#toggleTasks').html('Show Current Tasks');
			$('.task-view-title').html('Past Tasks');
		}
		else {
			Session.set('showIncomplete', true);
			$('#toggleTasks').html('Show Past Tasks');
			$('.task-view-title').html('Current Tasks');
		}
	},

  // Toggles to practiceView. Back button is set in practiceView (for now)
  'click #practiceView': function(){
      Session.set('backToTasks', false);
      Session.set('practiceView', true);
  },

  'click #completeTask': function() {
    console.log(this.taskId);
    Meteor.call('completeTask', Meteor.userId(),this.taskId, function(err) {
        if (err) {console.log(err)}
    });
  }
});

Template.home_incomplete_tasks_main.helpers({
	tasks: function(){
		if (Session.get('showIncomplete')) {
			console.log(getFullStudentTasks(true, false, true, true));
			return getFullStudentTasks(true, false, true, true);
		} else {
			return getFullStudentTasks(false, true, true, true);
		}
	},
    backToTasks: function() {
        return Session.get('backToTasks');
    },
    practiceView: function() {
        return Session.get('practiceView');
    },
    showVideo: function() {
    	return Session.get('showVideo');
    },
    showCurrent: function(){
    	return Session.get('showCurrent');
    }
});