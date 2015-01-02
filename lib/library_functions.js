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

//See userClasses - gets all classes that the current user (teacher) is a part of 
teacherClasses = function() {
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

// See userClasses - gets all classes the current user (student) is a part of
studentClasses = function() {
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

// Combines studentClasses and teacherClasses
userClasses = function() {
    currentUser = Meteor.user();
    if (user.profile.teacher) {
        return teacherClasses();
    } else {
        return studentClasses();
    }
}

// returns student's instrument
studentInstrument = function() {
    var userRecord = Meteor.user();
    return userRecord.profile.instrument;
}

// Returns all classes that exist in the database
allClasses = function() {
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

// Returns all sections in a class
classSectionsById = function(classID) {
    var thisClass = Classes.findOne({
        _id: classID
    });
    pointer = Sections.find({
        _id: {
            $in: thisClass.sections
        }
    });
    return pointer.fetch();
}

getUserById = function(id) {
    return Meteor.users.findOne({
        _id: id
    }, {
        fields: {
            profile: 1
        }
    });
}

// Magically turns an array of user ids into an array of user objects!
getUsersByIds = function(ids) {
    var array = [];
    ids.forEach(function(id) {
        array.push(getUserById(id).profile);
    });
    return array;
}

getClassBySectionId = function(id) {
    var selector = {
        sections: {
            $elemMatch: {
                $in: [id]
            }
        }
    };
    var pointer = Classes.find(selector);
    return pointer.fetch()[0];
}

studentsInSameClass = function(id1, id2) {
    var selector = {
        $and: [{
            students: {
                $elemMatch: {
                    $in: [id1]
                }
            }
        }, {
            students: {
                $elemMatch: {
                    $in: [id2]
                }
            }
        }]
    };

    var pointer = Classes.find(selector);
    return pointer.fetch().length > 0;
}

//get all tasks in a section
sectionTasks = function(sectionID){
    var selector = {sections: {$elemMatch: {$in: [sectionID]}}}
    var pointer = Tasks.find(selector);
    return pointer.fetch()
}
//removes task and all instances of taskData
//here, so it's more trusted
removeTask = function(taskID){
    Tasks.remove({_id: taskID}, function(err){
        if (err){
            console.log(err);
        }
        else{

            //hacky workaround, need to make this more secure later
            

            TasksData.remove({taskId: taskID}, function(err){
                if (err){
                    console.log(err);
                }
                else{
                    console.log("task deleted!");
                }
            });
        }
    });
}