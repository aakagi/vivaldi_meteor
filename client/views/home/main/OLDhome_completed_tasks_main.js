Template.home_completed_tasks_main.helpers({
	completedtasks: function(){
		//get all incomplete tasks
		var selector = {$and: [{userId: Meteor.userId()}, {complete: true}]};
		return TasksData.find(selector).fetch();
	}
});