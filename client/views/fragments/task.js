Template.task.helpers({
    getTask: function(){
        //gets the actual task object
        taskID = Template.currentData().taskId;
        return Tasks.findOne({_id: taskID})
    },
    isPracticeTask: function(){

    },
    isAudioTask: function(){

    },
    isPostTask: function(){

    },
    completionFraction: function(){

    }
});