Template.messenger.rendered = function() {
    $('.messages').scrollTop(100000);
}
Template.user_messenger_main.helpers({
    getMessages: function() {
        //gets all messages between the two users
        var selector1 = {senderID: Template.currentData()._id, recipientID: Meteor.userId()};
        var selector2 = {senderID: Meteor.userId(), recipientID: Template.currentData()._id};
        var selector = {$or: [selector1, selector2]};
        var pointer = userMessages.find(selector, {sort: {date: 1}});
        return pointer.fetch();
    },
});

Template.user_messenger_main.events({
    'click #new-message-submit': function() {
        console.log("submit")
        var messagebody = document.getElementById("new-message").value;
        if (messagebody) {
            var newMessage = {
                recipientID: Template.currentData()._id,
                senderID: Meteor.userId(),
                body: messagebody,
                date: new Date()
            };
            console.log(newMessage)
            userMessages.insert(newMessage);
            document.getElementById("new-message").value = "";
            
        }
    },
})

Template.message_user.helpers({
    senderName: function() {
        var senderID = Template.currentData().senderID;
        if (senderID == Meteor.userId()){
            return "Me"
        }
        else{
            //possibly unsecure 
            var sender = Meteor.users.findOne({_id: senderID}).profile;
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