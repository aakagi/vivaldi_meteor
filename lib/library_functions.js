// FRONT-END FUNCTION __________________________________________________

setAlert = function(alertType, alert) {
    Session.set('alert', true);
    Session.set('alertMessage', alert);
    Session.set('alertType', alertType);
    $('body, .navopen').addClass('slide-alert');
    setTimeout(function() {
        Session.set('alert', false);
        $('body, .navopen').removeClass('slide-alert');
        setTimeout(function() {
            Session.set('alertMessage', null);
            Session.set('alertType', null);
            Session.set('buttonName', null);
        }, 250);
    }, 3200);
}

openTask = function(el) {
    var task = $(el).parents('.task');
    task.children('.task-body').css('display', 'block');
    $(el).html('See less').attr('onclick', 'closeTask(this)');
}
closeTask = function(el) {
    var task = $(el).parents('.task');
    task.children('.task-body').css('display', 'none');
    $(el).html('See more').attr('onclick', 'openTask(this)');
}

formatTime = function(sec) {
    var min = 0;
    var hr = 0;
    while (sec >= 60) {
        min += 1;
        sec -= 60;
    }
    while (min >= 60) {
        hr += 1;
        min -= 60;
    }
    hr = ("0" + hr).slice(-2);
    min = ("0" + min).slice(-2);
    sec = ("0" + sec).slice(-2);
    return hr + ':' + min + ':' + sec;
}

formatDate = function(d) {
    var dateString = new Date(d).toLocaleDateString();
    return dateString;
}

getPercent = function(a, b) {
    return (Math.round((a / b) * 10000) / 100) + '%';
}

formatAllDates = function() {
    $('.formatDate').each(function(index, el) {
        var date = new Date($(el).html()).toLocaleDateString();
        $(el).html(date);
    });
}

formatSecondsToTimeString = function() {
    $('.formatSecondsToTimeString').each(function(index, el) {
        var sec = $(el).html();
        var min = 0;
        var hr = 0;
        while (sec >= 60) {
            sec -= 60;
            min += 1;
        }
        while (min >= 60) {
            min -= 60;
            hr += 1;
        }

        var timeString = '';
        if (hr) {
            timeString += hr + ' hr';
            if (min || sec) {
                timeString += ', ';
            }
        }
        if (min) {
            timeString += min + ' min';
            if (sec) {
                timeString += ', ';
            }
        }
        if (sec) {
            timeString += sec + ' sec';
        }
        $(el).html(timeString);
    });
}

drawBoxes = function(canvas, ctx) {
    // 26 boxes wide, 7 tall
    canvas.width = $('#streak').parent('.chart').width();
    boxSize = (canvas.width - (4 * 25)) / 26;
    canvas.height = (7 * boxSize) + (6 * 4);

    for (var i = 0; 26 > i; i++) {
        for (var j = 0; 7 > j; j++) {
            if (Math.random() > 0.5) {
                ctx.fillStyle = "#ECF0F1";
            } else {
                ctx.fillStyle = "#333333";
            }
            var x = i * (boxSize + 4);
            var y = j * (boxSize + 4);
            ctx.fillRect(x, y, boxSize, boxSize);
        }
    }

}

// /FRONT-END FUNCTIONS _________________________________________________

// // GRAPH FUNCTIONS ______________________________________________________

// getStudentComparisonData = function() {
//     var data = [];


//     var studentSet = {
//         label: ""
//     }

// }

// // /GRAPH FUNCTIONS _____________________________________________________





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

// myName = function() {
//     if (Meteor.user()) {
//         var userRecord = Meteor.user();
//         var name = userRecord.profile.firstName + ' ' + userRecord.profile.lastName;
//         return name;
//     }
// }

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
    var studentSectionSelector = {
        users: {
            $elemMatch: {
                $in: [Meteor.userId()]
            }
        }
    };
    var studentSections = Sections.find(studentSectionSelector).fetch();
    return studentSections;
}

studentSectionsById = function(studentID) {
    var studentSectionSelector = {
        users: {
            $elemMatch: {
                $in: [studentID]
            }
        }
    };
    var studentSections = Sections.find(studentSectionSelector).fetch();
    return studentSections;
}

studentClassesById = function(studentID) {
    selector = {
        students: {
            $elemMatch: {
                $in: [studentID]
            }
        }
    };
    pointer = Classes.find(selector);
    return pointer.fetch();
}

studentInstrumentsById = function(studentID) {
    selector = {
        studentId: studentID
    };
    pointer = InstrumentStats.find(selector);
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
sectionTasks = function(sectionID) {
    var selector = {
        sections: {
            $elemMatch: {
                $in: [sectionID]
            }
        }
    }
    var pointer = Tasks.find(selector);
    return pointer.fetch()
}
//removes task and all instances of taskData
//here, so it's more trusted
removeTask = function(taskID) {
    Tasks.remove({
        _id: taskID
    }, function(err) {
        if (err) {
            console.log(err);
        } else {

            //hacky workaround, need to make this more secure later


            TasksData.remove({
                taskId: taskID
            }, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("task deleted!");
                }
            });
        }
    });
}

getStudentTasks = function() {
    return TasksData.find({
        userId: Meteor.userId()
    });
}

// get all student tasks by type ('Practice' | 'Audio' | 'Post')
getStudentTasksByType = function(t) {
    var studentTasks = [];
    var sections = studentSections();
    // For each students section
    for (i in sections) {
        var tasks = sectionTasks(sections[i]._id);
        // For each sections task
        for (j in tasks) {
            // Add if practice
            if (tasks[j].type == t) {
                studentTasks.push(tasks[j]);
            }
        }
    }
    return studentTasks;
}

// Returns true if teacher of the class
isTeacherOfClass = function(id) {

    if (!isTeacher()) {
        return false;
    }
    for (i in teacherClasses()) {
        if (teacherClasses()[i]._id == id) {
            return true;
        }
    }
    return false;
}

// Gets all tasks for a class only if teacher
getTasksByClassId = function(id) {
    if (isTeacherOfClass(id)) {
        var allTasks = [];
        var taskIds = [];
        var sections = classSectionsById(id);
        for (i in sections) {
            var tasks = sectionTasks(sections[i]._id);
            // Check for duplicates
            for (j in tasks) {
                if (taskIds.indexOf(tasks[j]._id) < 0) {
                    // For front end purposes
                    if (tasks[j].type == 'Practice') {
                        tasks[j].type_practice = true;
                    } else if (tasks[j].type == 'Audio') {
                        tasks[j].type_audio = true;
                    } else {
                        tasks[j].type_post = true;
                    }

                    // Add section data
                    var taskSections = [];
                    for (k in tasks[j].sections) {
                        var section = Sections.findOne({
                            _id: tasks[j].sections[k]
                        });
                        taskSections.push(section);
                    }

                    // Convert Date to locale string
                    tasks[j].dueDate = new Date(tasks[j].dueDate).toLocaleDateString();

                    // Convert duration to minutes
                    tasks[j].duration /= 60;

                    tasks[j].sections = taskSections;
                    allTasks.push(tasks[j]);
                    taskIds.push(tasks[j]._id);
                }
            }
        }
        return allTasks;
    }
    return 'Not authorized';
}

// Returns an array of tasks with both the task information and the task data
// isIncomplete: optional bool that returns either 
getFullStudentTasks = function(incomplete, complete, typeBoolean, sectionData) {
    var completeTasks = []

    if (incomplete && complete) {
        var selector = {
            userId: Meteor.userId()
        };
    } else if (incomplete) {
        var selector = {
            $and: [{
                userId: Meteor.userId()
            }, {
                complete: false
            }]
        };
    } else if (complete) {
        var selector = {
            $and: [{
                userId: Meteor.userId()
            }, {
                complete: true
            }]
        };
    } else {
        return 'Must specify incomplete, complete, or both';
    }

    // Fetch list of user's tasksData
    var td = TasksData.find(selector).fetch();

    // Loop through every task in tasksData
    for (i in td) {
        // Get task information
        var ti = Tasks.findOne({
            _id: td[i].taskId
        });
        var task = $.extend(td[i], ti);

        // Add taskData id
        task.taskDataId = td[i]._id;

        // Add type boolean if requested
        if (typeBoolean) {
            switch (task.type) {
                case 'Practice':
                    task.type_practice = true;
                    break;
                case 'Audio':
                    task.type_audio = true;
                    break;
                case 'Post':
                    task.type_post = true;
                    break;
            }
        }

        // Replace section id array with section object array if requested
        if (sectionData) {
            var sections = [];
            for (k in task.sections) {
                sections.push(Sections.findOne({
                    _id: task.sections[k]
                }));
            }
            task.sections = sections;
        }

        // Add to array of complete tasks
        completeTasks.push(task);
    }

    // Return array of complete tasks
    return completeTasks;
}

oneWeekFromNow = function() {
    //returns the date one week from now
    var now = new Date();
    var currentDay = now.getDate();
    now.setDate(currentDay + 7);
    return now
}

//should only be a single active challenge
activeChallengeWithClass = function(objectid) {
    return Challenges.findOne({
        $and: [{
            $or: [{
                challenged: objectid
            }, {
                challenger: objectid
            }]
        }, {
            accepted: true
        }, {
            winner: null
        }]
    });
}

pendingChallengesWithClass = function(objectid) {
    var results = Challenges.find({
        $and: [{
            challenged: classid
        }, {
            accepted: false
        }, {
            winner: null
        }]
    }).fetch();
    //console.log(results);
    return results;
}


//sums the experience across all students in a class
getExperienceTotalForClass = function(classid) {
    var thisClass = Classes.findOne({
        _id: classid
    });

    var expForStudentArray = thisClass.students.map(getExperienceTotalForStudent);
    if (expForStudentArray.length > 0) {
        var total = expForStudentArray.reduce(function(previousVal, currentVal, index, array) {
            return previousVal + currentVal
        });
    } else {
        return 0
    }
    return total;
}


getExperienceTotalForSection = function(sectionID) {
    var thisSection = Sections.findOne({
        _id: sectionID
    });

    var expForStudentArray = thisSection.users.map(getExperienceTotalForStudent);
    if (expForStudentArray.length > 0) {
        var total = expForStudentArray.reduce(function(previousVal, currentVal, index, array) {
            return previousVal + currentVal
        });
    } else {
        return 0
    }
    return total;
}

getExperienceTotalForStudent = function(studentId) {
    var instruments = InstrumentStats.find({
        studentId: studentId
    }).fetch();
    var total = 0;
    for (i in instruments) {
        total += instruments[i].experience;
    }
    return total;
}

newChallenge = function(challenged, challenger) {
    var newChallenge = {
        challenger: challenger,
        challenged: challenged,
        start: new Date(),
        end: oneWeekFromNow(),
        startXPchallenger: getExperienceTotalForClass(challenger),
        startXPchallenged: getExperienceTotalForClass(challenged),
        accepted: false
    };
    Challenges.insert(newChallenge, function(err, ID) {
        if (err) {
            console.log(err);
            setAlert('error', 'an error occurred');
        } else {
            setAlert('info', 'challenged!');
        }
    });
}

newChallengeSection = function(challenged, challenger) {
    var newChallenge = {
        challenger: challenger,
        challenged: challenged,
        start: new Date(),
        end: oneWeekFromNow(),
        startXPchallenger: getExperienceTotalForSection(challenger),
        startXPchallenged: getExperienceTotalForSection(challenged),
        accepted: false
    };
    Challenges.insert(newChallenge, function(err, ID) {
        if (err) {
            console.log(err);
            setAlert('error', 'an error occurred');
        } else {
            setAlert('info', 'challenged!');
        }
    });
}

newChallengeStudent = function(challenged, challenger) {
    var newChallenge = {
        challenger: challenger,
        challenged: challenged,
        start: new Date(),
        end: oneWeekFromNow(),
        startXPchallenger: getExperienceTotalForStudent(challenger),
        startXPchallenged: getExperienceTotalForStudent(challenged),
        accepted: false
    };
    Challenges.insert(newChallenge, function(err, ID) {
        if (err) {
            console.log(err);
            setAlert('error', 'an error occurred');
        } else {
            setAlert('info', 'challenged!');
        }
    });
}

acceptChallenge = function(challengeID) {
    Challenges.update({
        _id: challengeID
    }, {
        $set: {
            accepted: true
        }
    });
}



convertExpToLevel = function(exp) {
    var level = 1;

    while (exp > 144) {
        exp = exp - (level * 144);
        level++;
    }

    return level;
}