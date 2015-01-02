Template.home_incomplete_tasks_main.helpers({
	incompleteTasks: function(){
		//get all incomplete tasks
		var selector = {$and: [{userId: Meteor.userId()}, {complete: false}]};
		console.log(TasksData.find(selector).fetch())
		return TasksData.find(selector).fetch();
	}
});