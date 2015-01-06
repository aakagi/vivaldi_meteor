Template.change_instrument.helpers({
    instrumentName: studentInstrument,
    instrumentList: function() {
    	selector = Instrument.find({
            "name": {
                $ne: studentInstrument()
            }
        });
        return selector.fetch();
    }
});

Template.change_instrument.events({
	'click #saveInstrument': function(){
		var instrumentName = document.getElementById('instrumentName').value;

		Meteor.users.update({_id: Meteor.userId()}, {$set: { 'profile.instrument' : instrumentName}}, function(err) {
            if (err) {
                console.log(err);
                setAlert('error', 'Error writing to database');
            } else {
                setAlert('info', 'You changed your instrument!');
            }
        });
	}
})