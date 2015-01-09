Template.student_view.helpers({
    userClasses: userClasses,
    isTeacher: isTeacher,
    // teacherProfile: function() {
    //     console.log(Template.currentData().profile.teacher);
    //     return true;
    // },
    inSameClass: function(){
        var myID = Meteor.userId();
        var studentId = Template.currentData()._id;

        var classes = Classes.find({
            $and: [{
                $or: [{
                    teachers: {
                        $elemMatch: {
                            $in: [myID]
                        }
                    }
                }, {
                    students: {
                        $elemMatch: {
                            $in: [myID]
                        }
                    }
                }]
            }, {
                students: {
                    $elemMatch: {
                        $in: [studentId]
                    }
                }
            }]
        }).fetch();

        Meteor.call('isVivaldi', myID, function(err, res) {Session.set('isVivaldi', res)});
        var vivaldi = Session.get('isVivaldi');

        if (vivaldi || classes.length > 0) {
            return true;
        } else {
            return false;
        }
    },
    unrelatedStudent: function() {
        return !isTeacher  && !studentsInSameClass(myID, thisID);
    },
    userMessage: function() {
        return Session.get('userMessage');
    },
    userStats: function() {
        return Session.get('userStats');
    }
});
Template.student_view.rendered = function () {
    Session.set('userMessage', true);
    Session.set('userStats', false);
};
Template.student_view.events({
    'click #userMessage': function(){
        Session.set('userMessage', true);
        Session.set('userStats', false);
    },
    'click #userStats': function(){
        Session.set('userMessage', false);
        Session.set('userStats', true);
    }
})