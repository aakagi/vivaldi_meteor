Template.join_section.helpers({
    sectionList: function() {
        var classData = Template.currentData(); //template initalized with class data
        var classId = classData._id;
        //get all sections that a student is not a member of and belong to this class
        selector = {
            $and: [{
                users: {
                    $not: {
                        $elemMatch: {
                            $in: [Meteor.userId()]
                        }
                    }
                }
            }, {
                _id: {
                    $in: classData.sections
                }
            }, {
                name: {
                    $not: 'Teachers'
                }
            }, {
                locked: false
            }];
        };
        pointer = Sections.find(selector);
        return pointer.fetch();
    }
});

Template.join_section.events({
    'click #joinSection': function() {
        //slightly hacky solution to problem of multiple fields in the document with the same value
        var classData = Template.currentData();
        var classId = classData._id;
        var sectionID = document.getElementById(classId).value;
        console.log(sectionID);
        Sections.update({
            _id: sectionID
        }, {
            $push: {
                users: Meteor.userId()
            }
        }, function(err) {
            if (err) {
                console.log(err);
                setAlert('error', 'error writing to database');
            } else {
                //add all tasks associated with that section to the student
                //i.e. create taskData for every task whose due date is later than the present
                var tasksAfterDate = sectionTasks(sectionID).filter(function(task) {
                    return task.dueDate > new Date();
                });
                console.log(tasksAfterDate);
                for (task in tasksAfterDate) {
                    var newTaskData = {
                        taskId: tasksAfterDate[task]._id,
                        userId: Meteor.userId(),
                        progress: 0, //seconds
                        notes: "",
                        complete: false
                    };
                    TasksData.insert(newTaskData);
                }
                setAlert('info', 'joined section!');
            }
        });
    }
})