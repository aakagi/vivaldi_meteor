Template.home_incomplete_tasks_main.rendered = function() {
	Session.set('showIncomplete', true);
    // For toggle between tasks and practice - May disable this option though...
    Session.set('backToTasks', true);
    Session.set('practiceView', false);
}

Template.home_incomplete_tasks_main.events({
	'click .practiceTask': function() {
		var task = Tasks.findOne({_id: this.taskId});
		console.log(task);
		Session.set('PracticeTaskObject', task);
		Session.set('duration', task.duration);
		Session.set('secondsPracticed', this.progress);
        // Sets variables for practice view
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
});

Template.home_incomplete_tasks_main.helpers({
	tasks: function(){
		if (Session.get('showIncomplete')) {
			//get all incomplete tasks
			var selector = {$and: [{userId: Meteor.userId()}, {complete: false}]};
		}
		else {
			var selector = {$and: [{userId: Meteor.userId()}, {complete: true}]};
		}
		var taskData = TasksData.find(selector).fetch();

		var taskObjects = [];
		for (i in taskData) {
			var taskInfo = Tasks.findOne({_id: taskData[i].taskId});
			var taskObject = $.extend(taskData[i], taskInfo);
			taskObject.taskDataId = taskData[i]._id;

			// For front end purposes
            if (taskObject.type == 'Practice') {
                taskObject.type_practice = true;
            } else if (taskObject.type == 'Audio') {
                taskObject.type_audio = true;
            } else {
                taskObject.type_post = true;
            }

            // Add section data
            var taskSections = [];
            for (k in taskObject.sections) {
                var section = Sections.findOne({_id: taskObject.sections[k]});
                taskSections.push(section);
            }
            taskObject.sections = taskSections;

            // Convert Date to locale string
            taskObject.dueDate = new Date(taskObject.dueDate).toLocaleDateString();

            // Convert duration to minutes
            if (taskObject.duration % 60 == 0) {
            	taskObject.duration = (taskObject.duration / 60) + ' min';
            }
            else {
            	var sec = taskObject.duration;
            	var min = 0;
            	while (sec >= 60) {
            		sec -= 60;
            		min += 1;
            	}
            	taskObject.duration = min + ' min, ' + sec + ' sec';
            }


			taskObjects.push(taskObject);
		}

		Session.set('studentTasks', taskObjects);

		return taskObjects;
	},
    backToTasks: function() {
        return Session.get('backToTasks');
    },
    practiceView: function() {
        return Session.get('practiceView');
    },
});