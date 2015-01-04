Template.section_view.rendered = function() {
    $('.messages').scrollTop(100000);
}

Template.section_view.helpers({
    class: function() {
        var id = Template.currentData()._id;
        var classData = getClassBySectionId(id);
        return classData;
    },
    studentData: function() {
        var ids = Template.currentData().users;
        return getUsersByIds(ids);
    },
    getMessages: function() {
        //gets all messages for this section for now, most likely add something more specific later 
        var selector = {sectionID: Template.currentData()._id}
        var pointer = Messages.find(selector);
        return pointer.fetch();
    }
});

Template.section_view.events({
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
    }
})

Template.message.helpers({
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