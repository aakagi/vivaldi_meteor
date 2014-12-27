setAlert = function(alertType, alert) {
    Session.set('alert', alert);
    Session.set('alertType', alertType);
    setTimeout(function() {
        console.log("timeout");
        Session.set('alert', null);
        Session.set('alertType', null);
        Session.set('buttonName', null);
    }, 3200);
}

//userid: string
//data: JSON
updateUserData = function(userid, data) {
    //I think I can access the collection directly? 
    currentUser = users.update({
        _id: userid
    }, {
        $set: data
    });
}

//returns if the currently logged-in user is a teacher.
isTeacher = function() {
    var userRecord = Meteor.user();
    return userRecord.profile.teacher;
}

//returns the current school of a currently logged-in user.
currentSchool = function() {
    var userRecord = Meteor.user();
    return userRecord.profile.school;
}

teacherClasses = function() {
    //get all classes that the current user (teacher) is a part of 
<<<<<<< HEAD
    selector = {teachers: {$elemMatch: String(Meteor.userId)}};
=======
    selector = {
        teachers: {
            $elemMatch: {
                $in: [Meteor.userId()]
            }
        }
    };
>>>>>>> a49b90c06c8b1035f26435a8f286ec1d0d257cef
    pointer = Classes.find(selector);
    return pointer.fetch();
}

studentClasses = function() {
    //get all classes that the current user (teacher) is a part of 
    selector = {
        students: {
            $elemMatch: {
                $in: [Meteor.userId()]
            }
        }
    };
    pointer = Classes.find(selector);
    return pointer.fetch();
}