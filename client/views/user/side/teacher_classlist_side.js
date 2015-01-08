Template.teacher_classlist_side.helpers({
    listOfClasses: function () {
        var teacherId = Template.currentData()._id;
        var classDocs = Classes.find({
            teachers: teacherId
        }).fetch();
        return classDocs;

    }
});
