Template.student_views_class_tasks.helpers({
    foo: function () {
        // ...
    }
});

var points;
var video_id;
var formType;
var task_duration_seconds;

Template.student_views_class_tasks.rendered = function() {

    $('#taskForm').css('display', 'none');
    $('.field').css('display', 'none');

    $('#openCreateTask').click(function(event) {
        $('.preview').slideUp(250);
        $('#taskForm').slideDown(250);
    });

    $('.cancelClass').click(function(event) {
        $('#taskForm').slideUp(250);
        $('.preview').slideDown(250);
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

Template.student_views_class_tasks.helpers({
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
        console.log(pointer.fetch());
        return pointer.fetch();
    },
    allTasks: function() {
        var allTasks = getTasksByClassId(Template.currentData()._id);
        return allTasks;
    },
});
