Template.messenger.rendered = function() {
    $('.messages').scrollTop(100000);
}
Template.messenger.helpers({
    getMessages: function() {
        //gets all messages for this section for now, most likely add something more specific later 
        var selector = {sectionID: Template.currentData()._id}
        var pointer = Messages.find(selector);
        return pointer.fetch();
    },
});

Template.messenger.events({
    'click #new-message-submit': function() {
        var messagebody = document.getElementById("new-message").value;
        if (messagebody) {
            var newMessage = {
                sectionID: Template.currentData()._id,
                senderID: Meteor.userId(),
                body: messagebody,
                date: new Date()
            };
            Messages.insert(newMessage);
            document.getElementById("new-message").value = "";
            
        }
    },
})

Template.message_a.helpers({
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
        return date.toTimeString();
    }
});