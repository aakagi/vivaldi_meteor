var points;
var video_id;
var formType;
var task_duration_seconds;

Template.task_main.rendered = function() {

    $('.form').css('display', 'none');
    $('.field').css('display', 'none');

    $('.preview').click(function(event) {
        $('.preview').slideUp(250);
        $('.form').slideDown(250);
    });

    $('#cancelClass').click(function(event) {
        $('.form').slideUp(250);
        $('.preview').slideDown(250);
    });

    // Closes block when task is assigned
    $('#assignTask').click(function(event) {
        $('.form').slideUp(250);
        $('.preview').slideDown(250);
    });



    $('.type').click(function(event) {
        $('.type').removeClass('selected');
        $(this).addClass('selected');
        $('.field').css('display', 'none');

        // When practice is selected
        if ($('#practice').hasClass('selected')) {
            formType = 'Practice';
            var fields = ['.name', '.description', '.duration', '.due', '.sections', '.points', '.formButtons'];

            // Update points amount
            points = 0;
            $('#pointValue').html(points);

            // Change input labels for name and description to subject and body
            $('#taskNameLabel').html('Task Name');
            $('#taskName').attr('placeholder', 'Practice Four Seasons');
            $('#taskDescriptionLabel').html('Task Description (Optional)');
            $('#taskDescription').attr('placeholder', 'Practice measures 32-64');

            // Updates points on duration change
            $('#taskDuration').change(function(event) {
                points = 20 + (10 * document.getElementById("taskDuration").value);
                $('#pointValue').html(points);
                task_duration_seconds = document.getElementById("taskDuration").value * 60;
            });

            // Reveal fields for practice
            for (el in fields) {
                $(fields[el]).css('display', 'block');
            }
        }

        // When audio is selected
        else if ($('#audio').hasClass('selected')) {
            formType = 'Audio';
            var fields = ['.name', '.description', '.link', '.due', '.sections', '.points', '.formButtons'];

            // Update points amount
            points = 0;
            $('#pointValue').html(points);

            // Change input labels for name and description to subject and body
            $('#taskNameLabel').html('Task Name');
            $('#taskName').attr('placeholder', 'Four Seasons recording');
            $('#taskDescriptionLabel').html('Task Description (Optional)');
            $('#taskDescription').attr('placeholder', 'Listen to the recording by Friday');

            // Get id for video on link change
            $('#youTube').change(function(event) {
                video_id = document.getElementById('youTube').value.match(/v=(.{11})/)[1];

                // Preview video on change
                var newSrc = '//www.youtube.com/embed/' + video_id;
                $('.video').attr('src', newSrc);
                $('.video-preview').slideDown(100);

                // Get video data
                var apiURL = 'https://www.googleapis.com/youtube/v3/videos?id=' + video_id + '&key=AIzaSyB6HXsHdp5IN5bgj2nDkqHQRWSfHYPunow&part=snippet,contentDetails,statistics,status';
                $.getJSON(apiURL, function(json, textStatus) {
                    rx = /(\d[\d\.\*]*)/g;
                    var numbers = json.items[0].contentDetails.duration.match(rx);
                    var video_duration = (numbers[0] * 60) + (numbers[1] * 1);
                    task_duration_seconds = video_duration;
                    // Update points
                    points = video_duration * 5;
                    $('#pointValue').html(points);
                });
            });

            // Reveal fields for practice
            for (el in fields) {
                $(fields[el]).css('display', 'block');
            }
        } else if ($('#post').hasClass('selected')) {
            formType = 'Post';
            var fields = ['.name', '.description', '.sections', '.points', '.formButtons'];

            // Update points
            points = 10;
            $('#pointValue').html(points);

            // Change input labels for name and description to subject and body
            $('#taskNameLabel').html('Post Subject');
            $('#taskName').attr('placeholder', 'Enter subject line here...');
            $('#taskDescriptionLabel').html('Post Content');
            $('#taskDescription').attr('placeholder', 'Enter content here...');

            // Reveal fields for practice
            for (el in fields) {
                $(fields[el]).css('display', 'block');
            }
        }
    });

    $('.clickable').click(function(event) {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            $('.selectAll').removeClass('selected');
            if ($(this).hasClass('selectAll')) {
                $('.clickable').removeClass('selected');
            }
        } else {
            $(this).addClass('selected');
            if ($(this).hasClass('selectAll')) {
                $('.clickable').addClass('selected');
            }
        }
    });

}

Template.task_main.helpers({
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

Template.assign_task_main.events({
    'click #assignTask': function() {
        //get all values from fields
        var classId = Template.currentData()._id;

        var sectionIds = [];
        // Loop through each selected tag and add id to sectionIds
        $('.section-tags').children('.selected').each(function(index, el) {
            if (!$(this).hasClass('selectAll')) {
                sectionIds.push($(this).attr('id'));
            }
        });

        var taskType = formType; // Defined in rendered javascript when task type is selected
        var taskName = document.getElementById("taskName").value;
        var taskDescription = document.getElementById("taskDescription").value;
        var taskDuration = task_duration_seconds; // Defined when user changes Practice Length or video
        var youTube = video_id; // Defined when user changes link
        var dueDate = new Date(document.getElementById("dueDate").value);

        var newTask = {
            classId: classId,
            type: taskType,
            name: taskName,
            description: taskDescription,
            sections: sectionIds,
            duration: taskDuration,
            youtubeURL: youTube,
            dueDate: dueDate,
            creationDate: new Date(),
            points: points
        }

        // save task
        var taskID = Tasks.insert(newTask);

        for (i in sectionIds) {
            //get all students in the section so a taskData object can be created for each of them.
            var section = Sections.findOne({
                _id: sectionIds[i]
            });
            var studentIds = section.users

            for (indx in studentIds) {
                var oldTaskData = TasksData.find({
                    taskId: taskID,
                    userId: studentIds[indx]
                }).fetch();
                if (oldTaskData.length == 0) { //nothing matches this 
                    var newTaskData = {
                        taskId: taskID,
                        userId: studentIds[indx],
                        progress: 0, //seconds
                        notes: "",
                        complete: false
                    }
                    TasksData.insert(newTaskData);
                }
            }
        }
    }
});