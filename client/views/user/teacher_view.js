Template.teacher_view.helpers({
    userClasses: userClasses,
    isTeacher: isTeacher,
    // teacherProfile: function() {
    //     console.log(Template.currentData().profile.teacher);
    //     return true;
    // },
    usersInSameClass: function() {
        // TODO because I can't figure it out, god damn it
        // var myClasses = userClasses();
        // // Make sure userClassesById works!
        // var profileClasses = userClassesById(Template.currentData()._id);



        // if (classTeachers.indexOf(myId) > -1 || classStudents.indexOf(myId) > -1) {
        //     console.log('true');
        //     return true;
        // } else {
        //     console.log('false');
        //     return false;
        // }
    },
    unrelatedStudent: function() {
        return !isTeacher  && !studentsInSameClass(myID, thisID);
    },
    userMessage: function() {
        return Session.get('userMessage');
    },
    userStats: function() {
        return Session.get('userStats');
    }
});
