Template.task.helpers({
    getTask: function() {
        //gets the actual task object
        var taskID = Template.currentData().taskId;
        return Tasks.findOne({
            _id: taskID
        })
    },
    isPracticeTask: function() {
        var taskID = Template.currentData().taskId;
        var task = Tasks.findOne({
            _id: taskID
        });
        // console.log(task.type);
        return task.type === 'Practice';
    },
    isAudioTask: function() {
        var taskID = Template.currentData().taskId;
        var task = Tasks.findOne({
            _id: taskID
        });
        return task.type == 'Audio';
    },
    isPostTask: function() {
        var taskID = Template.currentData().taskId;
        var task = Tasks.findOne({
            _id: taskID
        });
        return task.type == 'Post';
    },
    completionFraction: function() {
        var taskID = Template.currentData().taskId;
        var task = Tasks.findOne({
            _id: taskID
        });
        return Template.currentData().progress / (task.duration * 60);
    },
    formatDate: function() {
        //simple for now, could do better formatting later
        var taskID = Template.currentData().taskId;
        var task = Tasks.findOne({
            _id: taskID
        });
        var date = task.dueDate;
        return date.toDateString()
    },
    sectionNames: function() {
        var taskID = Template.currentData().taskId;
        var task = Tasks.findOne({
            _id: taskID
        });
        return Sections.find({
            _id: {
                $in: task.sections
            }
        }).fetch();
    }
});