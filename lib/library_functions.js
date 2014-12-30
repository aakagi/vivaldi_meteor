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
    selector = {
        teachers: {
            $elemMatch: {
                $in: [Meteor.userId()]
            }
        }
    };
    pointer = Classes.find(selector);
    return pointer.fetch();
}

// returns student's instrument
studentInstrument = function () {
    var userRecord = Meteor.user();
    return userRecord.profile.instrument;
}

userClasses = function() {
    currentUser = Meteor.user();
    if (user.profile.teacher){
        return teacherClasses();
    }
    else{
        return studentClasses();
    }
}


studentClasses = function() {
    //get all classes that the current user (student) is a part of 
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

allClasses = function(){
    return Classes.find().fetch();
}

//get all sections that the student is a member of
studentSections = function() {
    selector = {
        users: {
            $elemMatch: {
                $in: [Meteor.userId()]
            }
        }
    };
    pointer = Sections.find(selector);
    return pointer.fetch();
}

classSectionsById = function(classID){
    var thisClass = Classes.findOne({_id: classID});
    pointer = Sections.find({_id: {$in: thisClass.sections}});
    return pointer.fetch()
}

getUserById = function(id){
    return Meteor.users.findOne({_id: id}, {fields: {profile: 1}});
}

// Magically turns an array of user ids into an array of user objects!
getUsersByIds = function(ids) {
    var array = [];
    ids.forEach(function(id) {
        console.log(getUserById(id));
        array.push(getUserById(id).profile);
    });
    return array;
}
