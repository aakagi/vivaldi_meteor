Template.notifications.helpers({
    notificationList: function(){
        userid = Meteor.userId();
        return activeNotificationsForUser(userid);
    },
    notificationCount: function(){
        userid = Meteor.userId();
        return activeNotificationsForUser(userid).length;
    },
    plural: function(){
        userid = Meteor.userId();
        if (activeNotificationsForUser(userid).length == 1){
            return ''
        }
        else{
            return 's'
        }
    }
});

Template.notification.events({
    'click #notificationLink': function(){
        //marks the notification as inactive
        Notifications.update({_id: Template.currentData()._id}, {$set: {active: false}});
    }
});

Template.notification.helpers({
    url: function(){
        var anchorId = Template.currentData().anchorId;
        var type = Template.currentData().type;
        if (type == 'sectionChat'){
            return "/section?id=" + anchorId
        }
        else if (type == 'userChat'){
            return "/user?id=" + anchorId
        }
        else{
            return 'ERR'
        }
    },
    text: function(){
        var anchorId = Template.currentData().anchorId;
        console.log(anchorId);
        var type = Template.currentData().type;
        if (type == 'sectionChat'){
            var section = Sections.findOne({_id: anchorId});
            return "New Message - " + section.name
        }
        else if (type == 'userChat'){
            var user = Meteor.users.findOne({_id: anchorId});
            console.log(user);
            return "New Message - " + user.profile.firstName + " " +user.profile.lastName
        }
        else{
            return 'ERR'
        }
    }
});

Template.notifications.rendered = function() {
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