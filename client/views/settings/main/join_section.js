Template.join_section.helpers({
    sectionList: function () {
        var classData = Template.currentData();//template initalized with class data
        var classId = classData._id;
        return classSectionsById(classId);
    }
});