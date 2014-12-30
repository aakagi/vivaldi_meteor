Template.home_class_list_main.helpers({
    teacherClassesList: userClasses
});

Template.home_class_list.helpers({
    numStudents: function () {
        return Template.currentData().students.length
    }
});