Template.side_menu.events({
	'click .fa-times': function() {
		$('.navadmin').animate({'left': '-17em'}, 250);
	},
});

Template.side_menu.helpers({
	firstName: function() {
		userid = Meteor.userId();
		user = Meteor.users.findOne({
			"_id": userid
		}, {
			fields: {
				profile: 1
			}
		});
		return user.profile.firstName;
	},
	lastName: function() {
		userid = Meteor.userId();
		user = Meteor.users.findOne({
			"_id": userid
		}, {
			fields: {
				profile: 1
			}
		});
		return user.profile.lastName;
	},
	teacherClasses: teacherClasses,
});