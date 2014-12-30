Template.join_section.helpers({
<<<<<<< HEAD
    // sectionList: function () {
        // Returns every section that the student is not enrolled in.

    // }
});

=======
    sectionList: function () {
        var classData = Template.currentData();//template initalized with class data
        var classId = classData._id;
        return classSectionsById(classId);
    }
});
>>>>>>> 075dfa548e0f50188625f860f541719a247e2b48
