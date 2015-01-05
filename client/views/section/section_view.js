Template.section_view.rendered = function() {
    $('.messages').scrollTop(100000);
    Session.set('sectionMessage', true);
    Session.set('sectionStats', false);
}


Template.section_view.helpers({
    isTeacher: isTeacher,
    class: function() {
        var id = Template.currentData()._id;
        var classData = getClassBySectionId(id);
        return classData;
    },
    // getUsersByIds() is now obsolete because it only returns profile and not _id
    // studentData: function() {
    //     var ids = Template.currentData().users;
    //     return getUsersByIds(ids);
    // },
    studentData: function() {
        var ids = Template.currentData().users;
        // return getUsersByIds(ids);
        var results = Meteor.users.find({
            _id: {
                $in: ids
            }
        }).fetch();
        return results;
    },
    getMessages: function() {
        //gets all messages for this section for now, most likely add something more specific later 
        var selector = {sectionID: Template.currentData()._id}
        var pointer = Messages.find(selector);
        return pointer.fetch();
    },
    sectionMessage: function() {
        return Session.get('sectionMessage');
    },
    sectionStats: function() {
        return Session.get('sectionStats');
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
    },
    'click #sectionMessage': function(){
        Session.set('sectionMessage', true);
        Session.set('sectionStats', false);
    },
    'click #sectionStats': function(){
        Session.set('sectionMessage', false);
        Session.set('sectionStats', true);
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