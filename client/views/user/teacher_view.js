Template.teacher_view.helpers({
    userClasses: userClasses,
    isTeacher: isTeacher,
    // teacherProfile: function() {
    //     console.log(Template.currentData().profile.teacher);
    //     return true;
    // },
    usersInSameClass: function() {
        //want to know if this teacher is the teacher of one of your classes

        var teacherID = Template.currentData()._id;

        //get all classes where a this teacher is a teacher and this student is a student

        var classes = Classes.find({
            $and: [{
                teachers: {
                    $elemMatch: {
                        $in: [teacherID]
                    }
                }
            }, {
                students: {
                    $elemMatch: {
                        $in: [Meteor.userId()]
                    }
                }
            }]
        }).fetch();
        return classes.length > 0;
    },
    unrelatedStudent: function() {
        return !isTeacher && !studentsInSameClass(myID, thisID);
    },
    userMessage: function() {
        return Session.get('userMessage');
    },
    userStats: function() {
        return Session.get('userStats');
    }
});