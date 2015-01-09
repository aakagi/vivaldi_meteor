Template.practice_interface.rendered = function() {
    // Initialize session variables
    // Session.set('practiceTask', false);
    // Session.set('practiceOther', false);
    // Session.set('practiceTaskObject', null);
    // Session.set('duration', 0);
    Session.set('timePicked', false);
    Session.set('taskPicked', false);

    var timer;
    var timeElapsed = $('#timeElapsed');
    var timeRemaining = $('#timeRemaining');
    var secondsPracticed = 0;
    var duration = Session.get('duration');

    // Initialize times
    timeElapsed.html(formatTime(secondsPracticed));
    timeRemaining.html(formatTime(duration - secondsPracticed));

    // JQuery Events
    $('#startTimer').click(function(event) {
        console.log('wat');
        startTimer();
    });

    function startTimer() {
        duration = Session.get('practiceTaskObject');
        console.log(duration);
        // Timer instance, the loop that executed once every second
        timer = window.setInterval(function() {
            // Increase the secondsPracticed by one
            secondsPracticed++;

            // Rewrite the times
            timeElapsed.html(formatTime(secondsPracticed));
            timeRemaining.html(formatTime(duration - secondsPracticed));



            // Stop the timer on stopTimer click
            $("#stopTimer").click(function(event) {
                clearInterval(timer);
            });

        }, 1000);
    }

    // Formats the time from int seconds to string XX:XX:XX

}

Template.practice_interface.helpers({
    practiceTask: function() {
        return Session.get('practiceTask');
    },
    practiceOther: function() {
        return Session.get('practiceOther');
    },

});

Template.practice_interface.events({
    "click #practiceTask": function() {
        Session.set('practiceTask', true);
    },
    "click #practiceOther": function() {
        Session.set('practiceOther', true);
    },
    'change #selectPracticeTask': function() {
        var id = document.getElementById('selectPracticeTask').value;
        var task = Tasks.findOne({
            _id: id
        });
        var taskData = TasksData.findOne({
            taskId: id,
            userId: Meteor.userId()
        });
        $('#practiceTitle').html('Practicing <em>' + task.name + '</em>');
        $('#timeRemaining').html(formatTime(task.duration));
        $('#yourStatus').html('Your Status: <em>' + getPercent(taskData.progress, task.duration) + '</em>');
        Session.set('practiceTaskObject', task);
        Session.set('duration', task.duration);
        Session.set('secondsPracticed', taskData.progress);

        Session.set("taskPicked", true);
    },
    'click #submitPracticeTime': function() {
        var time = document.getElementById('selectPracticeLength').value * 60;
        $('#practiceTitle').html('Practicing for <em>' + (time / 60) + '</em> min');
        $('#timeRemaining').html(formatTime(time));
        $('#yourStatus').html('Your Status: <em>' + getPercent(0, time) + '</em>');
        Session.set('duration', time);
        Session.set('secondsPracticed', 0);
        Session.set('tempDuration', formatTime(time));

        Session.set("timePicked", true);
    },
    'click #showTasks': function() {
        Session.set('backToTasks', true);
        Session.set('practiceView', false);
        // Resets practice page to non-task view
        Session.set('practiceTask', false);
        Session.set('taskPicked', false);
        Session.set('practiceOther', false);
        Session.set('timePicked', false);
    }
});


// PRACTICE_TASK_INTERFACE ---------------------------


Template.practice_task_interface.helpers({
    studentPracticeTasks: function() {
        return getStudentTasksByType('Practice');
    },
    taskPicked: function() {
        return Session.get('taskPicked');
    }
});

Template.practice_task_interface.events({
    'click #startTimer': function() {
        var timer;
        var timeElapsed = $('#timeElapsed');
        var timeRemaining = $('#timeRemaining');
        var secondsPracticed = Session.get('secondsPracticed');
        var duration = Session.get('duration');
        $('#startTimer').addClass('disabled').attr('disabled', 'disabled');

        // Timer instance, the loop that executed once every second
        timer = window.setInterval(function() {
            // Increase the secondsPracticed by one
            secondsPracticed++;

            // Rewrite the times
            timeElapsed.html(formatTime(secondsPracticed));
            timeRemaining.html(formatTime(duration - secondsPracticed));
            $('#yourStatus').html('Your Status: <em>' + getPercent(secondsPracticed, duration) + '</em>');

            // Resize percentage bar
            var barWidth = $('.bar').width();
            var newWidth = barWidth * (secondsPracticed / duration);
            $('.percentage').width(newWidth);

            // Stop the timer on stopTimer click
            $("#stopTimer").click(function(event) {
                Session.set('secondsPracticed', secondsPracticed);
                clearInterval(timer);
                $('#startTimer').removeClass('disabled').removeAttr('disabled', 'disabled');
            });

        }, 1000);
    },
    'click #stopTimer': function() {
        //gets practice task info from Session
        var taskObject = Session.get('practiceTaskObject');
        var secondsPracticed = Session.get('secondsPracticed');
        //updates the task data with this duration
        var instrument = Meteor.user().profile.instrument;
        Meteor.call('saveProgress', Meteor.userId(), taskObject._id, instrument, secondsPracticed);
    }
});

Template.practice_task_interface.created = function() {
    $('#timeRemaining').html(formatTime(Session.get('duration')));
};




// PRACTICE_OTHER_INTERFACE -------------------------


Template.practice_other_interface.helpers({
    studentPracticeTasks: function() {
        return getStudentTasksByType('Practice');
    },
    timePicked: function() {
        return Session.get('timePicked');
    },
    tempDuration: function() {
        Session.get('tempDuration');
    }
});

Template.practice_other_interface.events({
    'click #startTimer': function() {
        var timer;
        var timeElapsed = $('#timeElapsed');
        var timeRemaining = $('#timeRemaining');
        var secondsPracticed = Session.get('secondsPracticed');
        var duration = Session.get('duration');
        $('#startTimer').addClass('disabled').attr('disabled', 'disabled');

        // Timer instance, the loop that executed once every second
        timer = window.setInterval(function() {
            // Increase the secondsPracticed by one
            secondsPracticed++;

            // Rewrite the times
            timeElapsed.html(formatTime(secondsPracticed));
            timeRemaining.html(formatTime(duration - secondsPracticed));
            $('#yourStatus').html('Your Status: <em>' + getPercent(secondsPracticed, duration) + '</em>');

            if (secondsPracticed == duration) {
                //same as if stop timer was called
                Session.set('secondsPracticed', secondsPracticed);
                clearInterval(timer);
                $('#startTimer').removeClass('disabled').removeAttr('disabled', 'disabled');
                saveProgressOther(timer, secondsPracticed);
                Router.go('home');
            }

            // Resize percentage bar
            var barWidth = $('.bar').width();
            var newWidth = barWidth * (secondsPracticed / duration);
            $('.percentage').width(newWidth);

            // Stop the timer on stopTimer click
            $("#stopTimer").click(function(event) {
                Session.set('secondsPracticed', secondsPracticed);
                clearInterval(timer);
                $('#startTimer').removeClass('disabled').removeAttr('disabled', 'disabled');
            });

        }, 1000);
    },
    'click #stopTimer': function() {
        console.log("updating instrument data");
        saveProgressOther();
    }
});

saveProgress = function() {

}

saveProgressOther = function() {
    //gets practice task info from Session
    var secondsPracticed = Session.get('secondsPracticed');
    console.log("seconds practiced: " + String(secondsPracticed));
    var oldSeconds = Session.get('oldSeconds');
    console.log("old seconds:" + String(oldSeconds));
    //updates the task data with this duration
    var instrument = Meteor.user().profile.instrument;
    Meteor.call('saveProgressOther', Meteor.userId(), instrument, oldSeconds, secondsPracticed);
    Session.set('oldSeconds', secondsPracticed);
}

finishTask = function() {
    Session.set('secondsPracticed', secondsPracticed);
    clearInterval(timer);
    $('#startTimer').removeClass('disabled').removeAttr('disabled', 'disabled');
    //gets practice task info from Session
    var taskObject = Session.get('practiceTaskObject');
    var secondsPracticed = Session.get('secondsPracticed');
    //updates the task data with this duration
    var instrument = Meteor.user().profile.instrument;
    Meteor.call('saveProgress', Meteor.userId(), taskObject._id, instrument, secondsPracticed);
}

Template.practice_other_interface.rendered = function() {
    Session.set('oldSeconds', 0);
    Session.set('duration', 0);
    $('#timeRemaining').html(formatTime(Session.get('duration')));
};