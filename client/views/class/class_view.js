Template.class_view.helpers({
	teachersArray: function() {
		var ids = Template.currentData().teachers;
		return getUsersByIds(ids);
	}
});