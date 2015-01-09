Template.other_teachers_side.helpers({
    // otherTeachersList: function() {
    //     // return otherTeacherDocuments;
    //     var selector = {
    //         $and: [{
    //             "profile.teacher": true
    //         }, {
    //             _id: {
    //                 $ne: Meteor.userId()
    //             }
    //         }]
    //     };
    //     return Meteor.users.find(selector).fetch();
    // }
});

Template.other_teachers_side.rendered = function() {
    $('#notificationList').css('display', 'none');

    var showing = false;

    $('#previewNotifications').click(function(event) {
        if (showing) {
            $('#notificationList').slideUp(250);
        } else {
            $('#notificationList').slideDown(250);
        }
        showing = !showing;
    });

}