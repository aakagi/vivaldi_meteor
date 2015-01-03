Template.teacher_task.helpers({
    isPracticeTask: function(){
        return Template.currentData().type == 'Practice';
    },
    isPracticeTask: function(){
        return Template.currentData().type == 'Audio';
    },
    formatDate: function(){
        //simple for now, could do better formatting later
        var date = Template.currentData().dueDate;
        return date.toDateString()
    },
    className: function(){
        var classData = Template.parentData(1);
        return classData.name;
    },
    sectionNames: function(){
        var taskData = Template.currentData();
        return Sections.find({_id: {$in: taskData.sections}}).fetch();
    }
});

Template.teacher_task.events({
    'click #delete': function(){
        //must delete the task and all instances of taskData
        var taskID = Template.currentData()._id;
        Meteor.call('removeTask', taskID);
    }
});


Template.class_task_list_main.helpers({
	getTasks: function(){
		var classId = Template.currentData()._id;
		var pointer = Tasks.find({classId: classId});
		return pointer.fetch();
	}
})


