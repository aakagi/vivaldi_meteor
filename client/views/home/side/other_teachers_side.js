Template.other_teachers_side.helpers({
    otherTeachersList: function() {
        // return otherTeacherDocuments;
        var selector = {
            $and: [{
                "profile.teacher": true
            }, {
                _id: {
                    $ne: Meteor.userId()
                }
            }]
        };
        return Meteor.users.find(selector).fetch();
    }
});

Template.other_teachers_side.rendered = function() {
    $('#otherTeachersList').css('display', 'none');

    var otherTeachersOpen = false;

    $('#previewOtherTeachers').click(function(event) {
        if (otherTeachersOpen) {
            $('#otherTeachersList').slideUp(250);
        } else {
            $('#otherTeachersList').slideDown(250);
        }
        otherTeachersOpen = !otherTeachersOpen;
    });

}