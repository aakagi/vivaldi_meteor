Template.section_view.rendered = function() {
	$('.messages').scrollTop(100000);
}

Template.section_view.helpers({
	class: function() {
		var id = Template.currentData()._id;
		var classData = getClassBySectionId(id);
		return classData;
	},
	studentData: function() {
		var ids = Template.currentData().users;
		return getUsersByIds(ids);
	},
});