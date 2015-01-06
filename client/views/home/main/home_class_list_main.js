Template.home_class_list_main.helpers({
    teacherClassesList: userClasses
});

Template.home_class_list.helpers({
    numStudents: function () {
        return Template.currentData().students.length
    },
    pendingStudents: function(){
    	return Template.currentData().waitlist.length
    },
    sections: function(){
    	return Template.currentData().sections.length
    },
});

Template.home_class_list_main.helpers({
    manageClass: function() {
        return Session.get('manageClass');
    },
    manageSections: function() {
        return Session.get('manageSections');
    },
    manageStudents: function() {
        return Session.get('manageStudents');
    },
    managePending: function() {
        return Session.get('managePending');
    },
    editingClass: function() {
        var classManageId = Session.get('classManageId');
        if (classManageId == Template.currentData()._id) {
            return true;
        } else {
            return false;
        }
    }
});

Template.home_class_list.events({
    'click #manageClass': function () {
        Session.set('manageClass', true);
        Session.set('manageSections', false);
        Session.set('manageStudents', false);
        Session.set('managePending', false);
        console.log('hello' + Session.get('manageClass'));
    },
    'click #manageSections': function () {
        Session.set('manageClass', false);
        Session.set('manageSections', true);
        Session.set('manageStudents', false);
        Session.set('managePending', false);
    },
    'click #manageStudents': function () {
        Session.set('manageClass', false);
        Session.set('manageSections', false);
        Session.set('manageStudents', true);
        Session.set('managePending', false);
    },
    'click #managePending': function () {
        Session.set('manageClass', false);
        Session.set('manageSections', false);
        Session.set('manageStudents', false);
        Session.set('managePending', true);
    },
    'click .manage': function() {
        classManageId = Template.currentData()._id
        Session.set('classManageId', classManageId);
    }
});