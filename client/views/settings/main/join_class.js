Template.join_class.helpers({
    'classList': function() {
        //gets a list of all classes that the student is not a member of

        selector = {
            students: {
                $not: {
                    $elemMatch: {
                        $in: [Meteor.userId()]
                    }
                }
            }
        };
        pointer = Classes.find(selector);
        return pointer.fetch()
    }
});

Template.join_class.events({
    'click #joinClass': function() {
        var classId = document.getElementById('selectClass').value;

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
});