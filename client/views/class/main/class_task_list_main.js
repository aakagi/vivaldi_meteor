Template.class_task_list_main.helpers({
	getTasks: function(){
		var classId = Template.currentData()._id;
		var pointer = Tasks.find({classId: classId});
		return pointer.fetch();
	}
})