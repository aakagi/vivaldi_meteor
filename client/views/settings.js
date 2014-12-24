Template.settings.helpers({
	isTeacher: function(){
		userid = Meteor.userId;
		user = Meteor.users.findOne({
            "_id": userid
        }, {
            fields: {
                profile: 1
            }
        });
        return user.profile.teacher
	}
});