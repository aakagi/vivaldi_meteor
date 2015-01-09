Template.nav_bar.rendered = function () {
	// $('#notifications').css('display', 'none');


    // var showing = false;

    // $('#toggleNotifications').click(function(event) {
    //     if (showing) {
    //         $('#notifications').slideUp(150);
    //     } else {
    //         $('#notifications').slideDown(150);
    //     }
    //     showing = !showing;
    // });
};

Template.nav_bar.events({
	// Open side menu when bars are clicked
	'click .fa-bars': function() {
		$('.navadmin').animate({'left': '0'}, 250);
	},
	// Close side menu when 'X' is clicked
	'click .fa-times': function() {
		$('.navadmin').animate({'left': '-17em'}, 250);
	},
});

Template.nav_bar.helpers({
	// Return the first name of the user
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
	// Return the last name of the user
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
	// Returns the array of class objects for the teacher
	userClasses: userClasses,
	studentSections: studentSections,
	isTeacher: isTeacher,

	// numberNotifications: function() {
	// 	TODO
	// }
	// notificationList: function() {
	// 	TODO	
	// }
});
