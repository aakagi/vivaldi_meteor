Template.join_class.helpers({
    'classList': function() {
        //gets a list of all classes that the student is not a member of
        selector = {
            $and: [{
                students: {
                    $not: {
                        $elemMatch: {
                            $in: [Meteor.userId()]
                        }
                    }
                }
            }, {
                waitlist: {
                    $not: {
                        $elemMatch: {
                            $in: [Meteor.userId()]
                        }
                    }
                }
            }, {
                locked: false
            }]
        };
        pointer = Classes.find(selector);
        return pointer.fetch()
    },
    'pendingClassesList': function() {
        pendingClasses = Classes.find({
            waitlist: {
                $in: [Meteor.userId()]
            }
        }).fetch();
        return pendingClasses;
    }
});

Template.join_class.events({
    'click #joinClass': function() {
        var classId = document.getElementById('selectClass').value;

        Classes.update({
            _id: classId
        }, {
            $push: {
                waitlist: Meteor.userId()
            }
        }, function(err) {
            if (err) {
                console.log(err);
                setAlert('error', 'Error writing to database');
            } else {
                setAlert('info', 'Added to class!');
            }
        });
    }
});

Template.pending_classes.events({
     'click #cancelJoinClass': function() {
        //removes student from waitlist
        var classID = Template.currentData()._id;
        var modifier = {$pull: {waitlist: Meteor.userId()}};
        Classes.update({_id: classID}, modifier, function(err){
             if (err) {
                console.log(err);
                setAlert('error', 'Error writing to database');
            } else {
                setAlert('info', 'Request cancelled.');
            }
        });  
    }
});