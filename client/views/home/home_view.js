Template.home_view.helpers({
    teacherClassesList: userClasses,
    isTeacher: isTeacher,
    showClasses: function(){
    	return Session.get('showClasses');
    }, 
    newClass: function(){
    	return Session.get('newClass');
    },
    allOtherClasses: function(){
    	return Session.get('allOtherClasses');
    }
});

Template.home_view.events({
	'click #showClasses': function(){
		Session.set('showClasses', true);
		Session.set('newClass', false);
		Session.set('allOtherClasses', false)
	},
	'click #newClass': function(){
		Session.set('showClasses', false);
		Session.set('newClass', true);
		Session.set('allOtherClasses', false)
	},
	'click #allOtherClass': function(){
		Session.set('showClasses', false);
		Session.set('newClass', false);
		Session.set('allOtherClasses', true)
	},
})

Template.home_class_list.helpers({
    numStudents: function () {
        
    }
});