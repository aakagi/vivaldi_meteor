var points;
var video_id;
var formType;
var task_duration_seconds;

Template.class_task_main.rendered = function() {

    $('#taskForm').css('display', 'none');
    $('.field').css('display', 'none');

    $('#openCreateTask').click(function(event) {
        $('#previewTask').slideUp(250);
        $('#taskForm').slideDown(250);
    });

    $('.cancelClass').click(function(event) {
        $('#taskForm').slideUp(250);
        $('#previewTask').slideDown(250);
    });

    $('.type').click(function(event) {
        $('.type').removeClass('selected');
        $(this).addClass('selected');
        $('.field').css('display', 'none');

        // When practice is selected
        if($('#practice').hasClass('selected')) {
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
            var date = oneWeekFromNow();
            document.getElementById('dueDate').valueAsDate = date;
        }

        // When audio is selected
        else if($('#audio').hasClass('selected')) {
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
            // Moving to actual meteor instead of jQuery
            // $('#youTube').change(function(event) {
            //     video_id = document.getElementById('youTube').value.match(/v=(.{11})/)[1];
                
            //     console.log(video_id);

            //     // Preview video on change
            //     var newSrc = '//www.youtube.com/embed/' + video_id;
            //     $('.video').attr('src', newSrc);
            //     $('.video-preview').slideDown(100);

            //     // Get video data
            //     var apiURL = 'https://www.googleapis.com/youtube/v3/videos?id=' + video_id + '&key=AIzaSyB6HXsHdp5IN5bgj2nDkqHQRWSfHYPunow&part=snippet,contentDetails,statistics,status';
            //     $.getJSON(apiURL, function(json, textStatus) {
            //         rx = /(\d[\d\.\*]*)/g;
            //         var numbers = json.items[0].contentDetails.duration.match(rx);

            //         // When video is x min and 0 sec, it returns NaN
            //         if (!numbers[1]) {
            //             numbers[1] = 0;
            //         }
            //         var video_duration = (numbers[0] * 60) + (numbers[1] * 1);
            //         task_duration_seconds = video_duration;
                    
            //         // Update points
            //         points = video_duration * 5;
            //         $('#pointValue').html(points);
            //     });
            // });

            // Reveal fields for practice
            for (el in fields) {
                $(fields[el]).css('display', 'block');
            }
            var date = oneWeekFromNow();
            document.getElementById('dueDate').valueAsDate = date;
        }

        else if ($('#post').hasClass('selected')) {
            formType = 'Post';

            
            // Update points
            if (isTeacher()) {
                var fields = ['.name', '.description', '.sections', '.points', '.formButtons'];
                points = 10;
            }
            else {
                var fields = ['.name', '.description', '.formButtons'];
                points = 0;
            }
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
            var date = oneWeekFromNow();
            document.getElementById('dueDate').valueAsDate = date;
        }
    });

    $('.clickable').click(function(event) {
        if($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            $('.selectAll').removeClass('selected');
            if ($(this).hasClass('selectAll')) {
                $('.clickable').removeClass('selected');
            }
        }
        else {
            $(this).addClass('selected');
            if ($(this).hasClass('selectAll')) {
                $('.clickable').addClass('selected');
            }
        }
    });

}

Template.class_task_main.helpers({
    seeVideo: function() {
        return Session.get('showVideo');
    },
    isTeacher: isTeacher,
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
        pointer = Sections.find(selector, {sort: {order: 1}});
        return pointer.fetch();
    },
    allTasks: function() {
        var allTasks = getTasksByClassId(Template.currentData()._id);
        // console.log('allTasks stuff:');
        // console.log(Template.currentData()._id);
        // console.log(getTasksByClassId(Template.currentData()._id));
        return allTasks;
    },
    isTeacher: function() {
        return isTeacher();
    }
});



Template.class_task_main.events({
    'click #assignTask': function() {
        //get all values from fields
        var classId = Template.currentData()._id;
        // console.log('classId: ' + classId);
        
        var sectionIds = [];
        // Loop through each selected tag and add id to sectionIds
        if (isTeacher()) {
            $('.section-tags').children('.selected').each(function(index, el) {
                    if (!$(this).hasClass('selectAll')) {
                        sectionIds.push($(this).attr('id'));
                    }
            });
        }
        else {
            var sections = classSectionsById(classId);
            for (i in sections) {
                sectionIds.push(sections[i]._id);
            }
        }



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
            points: points,
            authorId: Meteor.userId()
        }

        // save task
        var taskID = Tasks.insert(newTask);


        for (i in sectionIds) {
            //get all students in the section so a taskData object can be created for each of them.
            var section = Sections.findOne({_id: sectionIds[i]});
            var studentIds = section.users;

            console.log("section:" + section);
            console.log("student ids" + studentIds);



            taskAlreadyAssigned = function(taskId, studentId) {
                // console.log('taskID and studentIds ' + taskID + ' ' + studentIds[indx]);
                var selector = {
                    $and: [{
                        taskId: taskId
                    }, {
                        userId: studentId
                    }]
                }
                if (TasksData.findOne(selector)) {
                    return true;
                } else {
                    return false;
                }
            }

            for (indx in studentIds) {
                console.log(studentIds[indx]);
                if (taskAlreadyAssigned(taskID, studentIds[indx])) {
                    console.log('true');
                } else {
                    var newTaskData = {
                        taskId: taskID,
                        userId: studentIds[indx],
                        progress: 0, //seconds
                        notes: "",
                        complete: false,
                        creationDate: new Date()
                    };
                    
                    TasksData.insert(newTaskData);
                }

            }
        }
        $('.form').slideUp(250);
        $('#previewTask').slideDown(250);
    },
    'click .view-more': function(event) {
        var target = event.currentTarget.getAttribute('name');
        var selector = $('#' + target);
        selector.parent().children('.action-buttons').slideUp(100, function() {
            selector.slideDown(250);
        });
    },
    'click .close-view-more': function(event) {
        var selector = $(event.currentTarget).parent().parent();
        selector.children('.additional').slideUp(100, function() {
            selector.children('.action-buttons').slideDown(250);
        });
    },
    'click #deleteTask': function() {
        var taskID = Template.currentData()._id;
        console.log(taskID);
        Meteor.call('removeTask', taskID);
    },
    'change #youTube': function() {
        video_id = document.getElementById('youTube').value.match(/v=(.{11})/)[1];
        
        console.log(video_id);

        // Preview video on change
        var newSrc = '//www.youtube.com/embed/' + video_id;
        $('.video').attr('src', newSrc);
        $('.video-preview').slideDown(100);

        var bensKey = 'AIzaSyB6HXsHdp5IN5bgj2nDkqHQRWSfHYPunow';
        var alexsKey = 'AIzaSyAslO_txIQti3Ba99Ub3WIy_TCO1-LilKs';

        // Get video data
        var apiURL = 'https://www.googleapis.com/youtube/v3/videos?id=' + video_id + '&key='+alexsKey+'&part=snippet,contentDetails,statistics,status';
        $.getJSON(apiURL, function(json, textStatus) {
            rx = /(\d[\d\.\*]*)/g;
            var numbers = json.items[0].contentDetails.duration.match(rx);

            // When video is x min and 0 sec, it returns NaN
            if (!numbers[1]) {
                numbers[1] = 0;
            }
            var video_duration = (numbers[0] * 60) + (numbers[1] * 1);
            task_duration_seconds = video_duration;
            
            // Update points
            points = video_duration * 5;
            $('#pointValue').html(points);
        });
    }
});

Template.delete_temp.events({
    'click #deleteTask': function() {
        var taskID = Template.currentData()._id;
        console.log(taskID);
        Meteor.call('removeTask', taskID);
    },
});
Template.delete_t.events({
    'click #delete-t': function() {
        var taskID = Template.currentData()._id;
        console.log(taskID);
        Meteor.call('removeTask', taskID);
    },
});

