Template.class_view.helpers({
	teachersArray: function() {
		var ids = Template.currentData().teachers;
		return getUsersByIds(ids);
	},
	studentsArray: function() {
		var ids = Template.currentData().students;
		return getUsersByIds(ids);
	},
    isTeacher: isTeacher
});