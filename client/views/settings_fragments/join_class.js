Template.join_class.helpers({
    'classList': function() {
        //gets a list of all classes
        pointer = Classes.find();
        return pointer.fetch()
    }
});

Template.join_class.events({
    'click #joinClass': function() {
        var selectedClass = document.getElementById('#classList').value; //whether or not this works depends on if the value is the template or the text
        var classData = selectedClass.data();
        var classId = classData._id;
        Classes.update({
            _id: classId
        }, {
            $push: {
                students: Meteor.userId()
            }
        }, function(err) {
            if (err) {
                console.log(err);
                setAlert('error', 'error writing to database');
            } else {
                setAlert('info', 'class joined!');
            }
        });
    }
})