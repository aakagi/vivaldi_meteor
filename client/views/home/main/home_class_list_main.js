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
        var manageCla = Session.get('manageClass');;

        if (manageCla) {
            Session.set('manageClass', false);
        } else {
            Session.set('manageClass', true);
            Session.set('manageSections', false);
            Session.set('manageStudents', false);
            Session.set('managePending', false);
        }
        manageCla = !manageCla;
    },
    'click #manageSections': function () {
        var manageSec = Session.get('manageSections');;

        if (manageSec) {
            Session.set('manageSections', false);
        } else {
            Session.set('manageClass', false);
            Session.set('manageSections', true);
            Session.set('manageStudents', false);
            Session.set('managePending', false);
        }
        manageSec = !manageSec;
    },
    'click #manageStudents': function () {
        var manageStu = Session.get('manageStudents');;

        if (manageStu) {
            Session.set('manageStudents', false);
        } else {
            Session.set('manageClass', false);
            Session.set('manageSections', false);
            Session.set('manageStudents', true);
            Session.set('managePending', false);
        }
        manageStu = !manageStu;
    },
    'click #managePending': function () {
        var managePen = Session.get('managePending');;

        if (managePen) {
            Session.set('managePending', false);
        } else {
            Session.set('manageClass', false);
            Session.set('manageSections', false);
            Session.set('manageStudents', false);
            Session.set('managePending', true);
        }
        managePen = !managePen;
    },
    'click .manage': function() {
        var classManageId = Template.currentData()._id
        Session.set('classManageId', classManageId);
    }
});