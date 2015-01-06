Meteor.methods({
    // Creates a new user and then sends an enrollment email
    'createUserFromEmail': function(email) {
        var newUserId = Accounts.createUser({
            email: email
        });
        Accounts.sendEnrollmentEmail(newUserId);
        return newUserId
    },
    'removeTask': function(taskID) {
        Tasks.remove({
            _id: taskID
        }, function(err) {
            if (err) {
                console.log(err);
            } else {
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
    },
    'deleteClass': function(classID) {
        var thisClass = Classes.findOne({
            _id: classID
        });

        Classes.remove({
            _id: classID
        }, function(err) {
            if (err) {
                console.log(err);
            }
            thisClass.sections.map(function(sectionID) {
                Meteor.call('deleteSection', sectionID, classID);
            });
        });
    },
    'deleteSection': function(sectionID, classID) {
        //first, gets a list of all tasks associated with this section.
        var allTasks = Tasks.find({
            sections: {
                $elemMatch: {
                    $in: [sectionID]
                }
            }
        }).fetch();
        console.log(allTasks);

        for (indx in allTasks) {
            var task = allTasks[indx];
            console.log(task);
            //gets a list of all taskData associated with this task.
            //there are two conditions for task modification/deletion:
            //if the task is only associated with this section, delete the task, and all data associated with it.
            //if the task is associated with this section and others, it's a bit trickier 

            if (task.sections.length == 1) {
                //delete task and all task data associated with it
                console.log("removing task");
                Meteor.call('removeTask', task._id);
                //done! 
            } else { //if it's associated with more than one task
                //then, we need to go through all taskData.
                //if the user for a taskData is not associated with any other section that the task belongs do, then delete the taskData.
                var allData = TasksData.find({
                    taskId: task._id
                }).fetch();
                console.log(allData);
                for (dataIndx in allData) {
                    var taskdata = allData[indx];
                    var userID = taskdata.userID;

                    //get all sections that are associated with this task and this user.
                    var sections = Sections.find({
                        $and: [{
                            _id: {
                                $in: task.sections
                            }
                        }, {
                            users: {
                                $elemMatch: {
                                    $in: [userID]
                                }
                            }
                        }]
                    }).fetch();
                    if (sections.length > 1) {
                        //modify the task's section list, but keep the taskData
                        Task.update({
                            _id: task._id
                        }, {
                            $pull: {
                                sections: sectionID
                            }
                        });
                    } else {
                        //delete the taskData. 
                        TasksData.remove({
                            _id: taskdata._id
                        });
                    }
                }
            }
        }
        //delete the section
        Sections.remove({
            _id: sectionID
        });
        Classes.update({
            _id: classID
        }, {
            $pull: {
                sections: sectionID
            }
        });
    },
    'saveProgress': function(studentID, taskID, instrumentName, secondsPracticed) {
        var selector = {
                taskId: taskID,
                userId: studentID
            }
            //first, calculates the change in seconds:
        var oldSeconds = TasksData.findOne(selector).progress;
        var deltaT = secondsPracticed - oldSeconds;
        var newHistory = {
            duration: deltaT,
            date: new Date()
        };
        var points = deltaT * 10;
        //saves a student's task progress.
        TasksData.update(selector, {
            $set: {
                progress: secondsPracticed
            }
        });

        InstrumentStats.update({
            studentId: studentID,
            instrumentName: instrumentName
        }, {
            $inc: {
                experience: points
            },
            $push: {
                history: newHistory
            }
        });


    }
});