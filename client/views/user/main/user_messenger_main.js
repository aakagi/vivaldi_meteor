Template.user_messenger_main.rendered = function() {
    $('.messages').scrollTop(100000);
}
Template.user_messenger_main.helpers({
    getMessages: function() {
        //gets all messages between the two users
        var selector1 = {
            senderID: Template.currentData()._id,
            recipientID: Meteor.userId()
        };
        var selector2 = {
            senderID: Meteor.userId(),
            recipientID: Template.currentData()._id
        };
        var selector = {
            $or: [selector1, selector2]
        };
        var pointer = userMessages.find(selector, {
            sort: {
                date: 1
            }
        });
        return pointer.fetch();
    },
});

sendMessageUser = function() {
    var messagebody = document.getElementById("new-message").value;
    thisUserID = Template.currentData()._id;
    myUserID = Meteor.userId()
    if (messagebody) {
        var newMessage = {
            recipientID: thisUserID,
            senderID: myUserID,
            body: messagebody,
            date: new Date()
        };
        console.log(newMessage)
        userMessages.insert(newMessage);
        document.getElementById("new-message").value = "";
        updateNotification(thisUserID, myUserID, 'userChat');
    }
}

Template.user_messenger_main.events({
    'click #new-message-submit': sendMessageUser,
    'keydown input': function(e) {
        if (e.keyCode == 13) {
            //send message
            sendMessageUser();
        }
    }
})

Template.message_user.helpers({
    senderName: function() {
        var senderID = Template.currentData().senderID;
        if (senderID == Meteor.userId()) {
            return "Me"
        } else {
            //possibly unsecure 
            var sender = Meteor.users.findOne({
                _id: senderID
            }).profile;
            $('.messages').scrollTop(100000);
            return sender.firstName + " " + sender.lastName;
        }
    },
    formattedDate: function() {
        var date = Template.currentData().date;
        $('.messages').scrollTop(100000);
        return date.toLocaleTimeString();
    }
});