Template.assign_task.helpers({
    sectionList: function() {
        var classData = Template.currentData(); //template initalized with class data
        var classId = classData._id;
        selector = {
            $and: [{
                _id: {
                    $in: classData.sections
                }
            }, {
                name: {
                    $not: 'Teachers'
                }
            }]
        };
        pointer = Sections.find(selector);
        return pointer.fetch();
    }
});

Template.assign_task.events({
        'click #assignTask': function() {
            //get all values from fields
            var classId = Template.currentData()._id;
            var sectionId = document.getElementById("selectSection").value;

            var taskType = document.getElementById("taskType").value;
            var taskName = document.getElementById("taskName").value;
            var taskDescription = document.getElementById("taskDescription").value;
            var taskDuration = document.getElementById("taskDuration").value;
            var youTube = document.getElementById("youTube").value;
            var points = document.getElementById("points").value;
            var dueDate = new Date(document.getElementById("dueDate").value);

            var newTask = {
                classId: classId,
                type: taskType,
                name: taskName,
                description: taskDescription,
                sections: [sectionId],
                duration: taskDuration,
                youtubeURL: youTube,
                dueDate: dueDate,
                creationDate: new Date(),
                points: points
            }

        // save task
        var taskID = Tasks.insert(newTask);

        //get all students in the section so a taskData object can be created for each of them.

        var section = Sections.findOne({_id: sectionId});
        var studentIds = section.users

        for (indx in studentIds) {
            var newTaskData = {
                taskId: taskID,
                userId: studentIds[indx],
                progress: 0, //seconds
                notes: " ",
                complete: false
            };
            TasksData.insert(newTaskData);
        }
    }
});